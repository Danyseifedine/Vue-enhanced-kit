<?php

namespace App\Providers;

use App\Auth\CachedEloquentUserProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Repository pattern removed - using Services directly
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {}
}
