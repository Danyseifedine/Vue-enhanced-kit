<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class FileUploadController extends Controller
{
    /**
     * Upload files temporarily to storage/temp
     */
    public function uploadTemp(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240', // 10MB max
                'context' => 'sometimes|string|max:50|regex:/^[a-zA-Z0-9_-]+$/', // Optional context validation
            ]);

            $uploadedFiles = [];
            $context = $request->input('context', 'general');
            $userId = auth()->id() ?? 'guest';

            // Create context-based directory: temp/{context}/{user_id}/
            $contextPath = "temp/{$context}/{$userId}";

            foreach ($request->file('files') as $file) {
                // Generate unique filename
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

                // Store in context-specific directory within public disk
                $path = $file->storeAs($contextPath, $filename, 'public');

                $uploadedFiles[] = [
                    'temp_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'url' => Storage::disk('public')->url($path), // For preview
                    'context' => $context, // Include context in response
                ];
            }

            return response()->json([
                'success' => true,
                'files' => $uploadedFiles,
                'message' => 'Files uploaded successfully'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete temporary file
     */
    public function deleteTemp(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'temp_path' => 'required|string'
            ]);

            $tempPath = $request->input('temp_path');

            // Security check - ensure path is in temp directory and follows our structure
            if (!str_starts_with($tempPath, 'temp/') || str_contains($tempPath, '..')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid file path'
                ], 400);
            }

            if (Storage::disk('public')->exists($tempPath)) {
                Storage::disk('public')->delete($tempPath);

                return response()->json([
                    'success' => true,
                    'message' => 'File deleted successfully'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'File not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clean up old temporary files (can be called via scheduled command)
     */
    public function cleanupTemp(): JsonResponse
    {
        try {
            // Get all files in temp directory recursively
            $tempFiles = Storage::disk('public')->allFiles('temp');
            $deletedCount = 0;
            $cutoffTime = now()->subHours(24); // Delete files older than 24 hours

            foreach ($tempFiles as $file) {
                // Skip .gitkeep files
                if (basename($file) === '.gitkeep') {
                    continue;
                }

                $lastModified = Storage::disk('public')->lastModified($file);

                if ($lastModified < $cutoffTime->timestamp) {
                    Storage::disk('public')->delete($file);
                    $deletedCount++;
                }
            }

            // Clean up empty directories
            $this->cleanupEmptyDirectories('temp');

            return response()->json([
                'success' => true,
                'message' => "Cleaned up {$deletedCount} temporary files"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cleanup failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clean up empty directories recursively
     */
    private function cleanupEmptyDirectories(string $directory): void
    {
        $directories = Storage::disk('public')->directories($directory);

        foreach ($directories as $dir) {
            // Recursively clean subdirectories first
            $this->cleanupEmptyDirectories($dir);

            // Check if directory is empty (only contains .gitkeep or is completely empty)
            $files = Storage::disk('public')->files($dir);
            $subdirs = Storage::disk('public')->directories($dir);

            $isEmpty = empty($subdirs) && (
                empty($files) ||
                (count($files) === 1 && basename($files[0]) === '.gitkeep')
            );

            if ($isEmpty && $dir !== 'temp') { // Don't delete the main temp directory
                Storage::disk('public')->deleteDirectory($dir);
            }
        }
    }
}
