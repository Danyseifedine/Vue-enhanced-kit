<?php

use App\Http\Controllers\HomeController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


if (config('app.features.multi_lang')) {
    Route::group(
        [
            'prefix' => LaravelLocalization::setLocale(),
            'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
        ],
        function () {
            registerWebRoutes();
        }
    );
} else {
    registerWebRoutes();
}

// i need better name then defineRoutes
function registerWebRoutes()
{
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::middleware([
        'auth',
        'verified',
        'role:super-admin',
        'permission:access-super-admin-panel',
    ])->group(function () {
        require __DIR__ . '/super-admin.php';
    });

    require __DIR__ . '/auth.php';
}
