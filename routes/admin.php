<?php

use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\Admin\Settings\PasswordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/admin', [IndexController::class, 'index'])->middleware(['auth', 'verified'])->name('admin');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::redirect('/settings', '/admin/settings');

    Route::prefix('settings')->name('settings.')->group(function () {

        Route::prefix('profile')->name('profile.')->group(function () {
            Route::get('edit', [ProfileController::class, 'edit'])->name('edit');
            Route::patch('update', [ProfileController::class, 'update'])->name('update');
            Route::delete('destroy', [ProfileController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('password')->name('password.')->group(function () {
            Route::get('edit', [PasswordController::class, 'edit'])->name('edit');
            Route::put('update', [PasswordController::class, 'update'])->name('update');
        });

        Route::get('appearance', [IndexController::class, 'appearance'])->name('appearance');
    });
});
