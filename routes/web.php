<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('browse-products', function () {
        return Inertia::render('BrowseProducts');
    })->name('browse-products');

    Route::get('loyalty-points', function () {
        return Inertia::render('LoyaltyPoints');
    })->name('loyalty-points');

    Route::get('purchase-history', function () {
        return Inertia::render('PurchaseHistory');
    })->name('purchase-history');

    Route::get('wishlist', function () {
        return Inertia::render('Wishlist');
    })->name('wishlist');

    Route::get('promotions', function () {
        return Inertia::render('Promotions');
    })->name('promotions');

    Route::get('notifications', function () {
        return Inertia::render('Notifications');
    })->name('notifications');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
