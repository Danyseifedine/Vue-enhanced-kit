<?php

namespace App\Http\Controllers;

use App\Traits\HasDataTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\FileUpload\FileUploadService;
use Illuminate\Validation\ValidationException;

class BaseController extends Controller
{
    use HasDataTable;

    public function __construct(
        protected readonly FileUploadService $fileUploadService
    ) {}

    public function successResponse(string $message, string $title = 'Success', $data = null): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'title' => $title,
            'data' => $data,
        ]);
    }

    public function errorResponse(string $message, string $title = 'Error', $data = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'title' => $title,
            'data' => $data,
        ]);
    }

    public function successWithToast(string $message, string $title = 'Success')
    {
        return redirect()->back()->with([
            'success' => true,
            'toast' => [
                'type' => 'success',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }

    public function errorWithToast(string $message, string $title = 'Error')
    {
        return redirect()->back()->with([
            'success' => false,
            'toast' => [
                'type' => 'error',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }

    // ========================================================
    // Start File Upload
    // ========================================================

    /**
     * Upload files temporarily to storage/temp
     */
    public function uploadTemp(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240', // 10MB max
                'context' => 'sometimes|string|max:50|regex:/^[a-zA-Z0-9_-]+$/',
            ], [
                'files.*.max' => 'The file ":attribute" is too large. Maximum size allowed is 10MB.',
                'files.*.mimes' => 'The file ":attribute" must be an image of type: jpeg, png, jpg, gif, svg, or webp.',
                'files.*.file' => 'The uploaded file ":attribute" is not valid.',
            ]);

            $context = $request->input('context', 'general');
            $uploadedFiles = $this->fileUploadService->uploadTemp(
                $request->file('files'),
                $context
            );

            return $this->successResponse('Files uploaded successfully', 'Files uploaded successfully', $uploadedFiles);
        } catch (ValidationException $e) {
            return $this->errorResponse('Validation failed', 'Validation failed', $e->errors());
        } catch (\Exception $e) {
            return $this->errorResponse('Upload failed: ' . $e->getMessage(), 'Upload failed', $e->getMessage());
        }
    }

    /**
     * Delete temporary file
     */
    public function deleteTemp(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'temp_path' => 'required|string',
            ]);

            $tempPath = $request->input('temp_path');
            $deleted = $this->fileUploadService->deleteTemp($tempPath);

            if (! $deleted) {
                return $this->errorResponse('File not found', 'File not found', $tempPath);
            }

            return $this->successResponse('File deleted successfully', 'File deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->errorResponse('Delete failed: ' . $e->getMessage(), 'Delete failed', $e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse('Delete failed: ' . $e->getMessage(), 'Delete failed', $e->getMessage());
        }
    }

    /**
     * Clean up old temporary files (can be called via scheduled command)
     */
    public function cleanupTemp(): JsonResponse
    {
        try {
            $deletedCount = $this->fileUploadService->cleanupOldFiles(24);

            return $this->successResponse('Cleaned up ' . $deletedCount . ' temporary files', 'Cleaned up ' . $deletedCount . ' temporary files', $deletedCount);
        } catch (\Exception $e) {
            return $this->errorResponse('Cleanup failed: ' . $e->getMessage(), 'Cleanup failed', $e->getMessage());
        }
    }

    // ========================================================
    // End File Upload
    // ========================================================
}
