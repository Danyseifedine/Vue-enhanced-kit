<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupTempFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'temp:cleanup {--hours=24 : Delete files older than specified hours}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up temporary uploaded files older than specified hours';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $hours = (int) $this->option('hours');
        $cutoffTime = now()->subHours($hours);

        $this->info("Cleaning up temporary files older than {$hours} hours...");

        $tempFiles = Storage::disk('public')->allFiles('temp');
        $deletedCount = 0;

        foreach ($tempFiles as $file) {
            // Skip .gitkeep file
            if (basename($file) === '.gitkeep') {
                continue;
            }

            $lastModified = Storage::disk('public')->lastModified($file);

            if ($lastModified < $cutoffTime->timestamp) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
                $this->line("Deleted: {$file}");
            }
        }

        // Clean up empty directories
        $this->cleanupEmptyDirectories('temp');

        $this->info("Cleanup completed. Deleted {$deletedCount} temporary files.");

        return self::SUCCESS;
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
                $this->line("Deleted empty directory: {$dir}");
            }
        }
    }
}
