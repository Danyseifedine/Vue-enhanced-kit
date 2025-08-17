<?php

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
    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('home');

    Route::middleware(['role:super-admin', 'permission:access-admin-panel'])->group(function () {
        require __DIR__ . '/admin.php';
    });

    require __DIR__ . '/auth.php';
}
