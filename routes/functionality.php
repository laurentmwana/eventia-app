<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Functionality\{
    GuestController,
    EventController
};

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('event', EventController::class)
            ->parameter('event', 'id');

        Route::resource('guest', GuestController::class)
            ->parameter('guest', 'id');
    });
