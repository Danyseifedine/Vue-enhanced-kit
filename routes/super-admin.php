<?php

use App\Http\Controllers\SuperAdmin\IndexController;
use App\Http\Controllers\SuperAdmin\UsersController;
use App\Http\Controllers\SuperAdmin\Settings\PasswordController;
use App\Http\Controllers\SuperAdmin\Settings\ProfileController;
use Illuminate\Support\Facades\Route;


Route::prefix('super-admin')->name('super-admin.')->group(function () {

    Route::get('/', [IndexController::class, 'index'])->name('dashboard');

    // ================================================
    // ---------------- Start Settings ----------------
    // ================================================

    Route::redirect('/settings', '/super-admin/settings');
    Route::prefix('settings')->name('settings.')->group(function () {

        Route::prefix('profile')->name('profile.')->group(function () {
            Route::get('edit', [ProfileController::class, 'edit'])->name('edit');
            Route::post('update', [ProfileController::class, 'update'])->name('update');
            Route::delete('destroy', [ProfileController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('password')->name('password.')->group(function () {
            Route::get('edit', [PasswordController::class, 'edit'])->name('edit');
            Route::put('update', [PasswordController::class, 'update'])->name('update');
        });

        Route::get('appearance', [IndexController::class, 'appearance'])->name('appearance');
    });

    // ================================================
    // ---------------- End Settings ------------------
    // ================================================

    // ================================================
    // ---------------- Start Users ------------------
    // ================================================

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::patch('/{user}/toggle-status', [UsersController::class, 'toggleStatus'])->name('toggle-status');
    });
});
