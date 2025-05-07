<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Functionality\{
    AssignmentController,
    GuestController,
    EventController,
    GuestSeatController,
    NotificationReceiveController
};

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('event', EventController::class)
            ->parameter('event', 'id');

        Route::resource('guest', GuestController::class)
            ->parameter('guest', 'id');

        Route::resource('guest-seat', GuestSeatController::class)
            ->parameter('guest-seat', 'id');

        Route::resource('assignment', AssignmentController::class)
            ->parameter('assignment', 'id');

        Route::get('notification/receive', NotificationReceiveController::class)
            ->name('notification.index');
    });
