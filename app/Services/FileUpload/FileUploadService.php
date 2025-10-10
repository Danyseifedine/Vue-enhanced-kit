<?php

namespace App\Services\FileUpload;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload files temporarily to storage
     *
     * @param  array<UploadedFile>  $files
     */
    public function uploadTemp(array $files, string $context = 'general', int|string|null $userId = null): array
    {
        $userId = $userId ?? (Auth::check() ? Auth::id() : 'guest');
        $contextPath = "temp/{$context}/{$userId}";
        $uploadedFiles = [];

        foreach ($files as $file) {
            $uploadedFiles[] = $this->storeFile($file, $contextPath, $context);
        }

        return $uploadedFiles;
    }

    /**
     * Store a single file
     */
    private function storeFile(UploadedFile $file, string $path, string $context): array
    {
        // Generate unique filename with timestamp
        $timestamp = now()->timestamp;
        $extension = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '-' . $timestamp . ($extension ? ".{$extension}" : '');

        // Store in context-specific directory within public disk
        $storedPath = $file->storeAs($path, $filename, 'public');

        return [
            'temp_path' => $storedPath,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'url' => Storage::disk('public')->url($storedPath),
            'context' => $context,
            'uploaded_at' => now()->toIso8601String(),
        ];
    }

    /**
     * Delete a temporary file
     *
     * @throws \InvalidArgumentException
     */
    public function deleteTemp(string $tempPath): bool
    {
        // Security check - ensure path is in temp directory and follows our structure
        if (! $this->isValidTempPath($tempPath)) {
            throw new \InvalidArgumentException('Invalid file path');
        }

        if (! Storage::disk('public')->exists($tempPath)) {
            return false;
        }

        return Storage::disk('public')->delete($tempPath);
    }

    /**
     * Check if a path is a valid temp path
     */
    private function isValidTempPath(string $path): bool
    {
        return str_starts_with($path, 'temp/') && ! str_contains($path, '..');
    }

    /**
     * Clean up old temporary files
     *
     * @return int Number of files deleted
     */
    public function cleanupOldFiles(int $hoursOld = 24): int
    {
        $tempFiles = Storage::disk('public')->allFiles('temp');
        $deletedCount = 0;
        $cutoffTime = now()->subHours($hoursOld);

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

        return $deletedCount;
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

    /**
     * Move temporary file to permanent storage
     *
     * @return string The new permanent path
     *
     * @throws \InvalidArgumentException
     */
    public function moveToPermanent(string $tempPath, string $destinationPath): string
    {
        if (! $this->isValidTempPath($tempPath)) {
            throw new \InvalidArgumentException('Invalid temp file path');
        }

        if (! Storage::disk('public')->exists($tempPath)) {
            throw new \InvalidArgumentException('Temp file does not exist');
        }

        // Move the file
        Storage::disk('public')->move($tempPath, $destinationPath);

        return $destinationPath;
    }

    /**
     * Get file info from temp path
     */
    public function getFileInfo(string $tempPath): ?array
    {
        if (! $this->isValidTempPath($tempPath) || ! Storage::disk('public')->exists($tempPath)) {
            return null;
        }

        return [
            'path' => $tempPath,
            'size' => Storage::disk('public')->size($tempPath),
            'mime_type' => Storage::disk('public')->mimeType($tempPath),
            'last_modified' => Storage::disk('public')->lastModified($tempPath),
            'url' => Storage::disk('public')->url($tempPath),
        ];
    }

    /**
     * Check if temp file exists
     */
    public function tempFileExists(string $tempPath): bool
    {
        return $this->isValidTempPath($tempPath) && Storage::disk('public')->exists($tempPath);
    }
}
