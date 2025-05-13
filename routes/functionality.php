<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Functionality\{
    AssignmentController,
    GuestController,
    EventController,
    GuestSeatController,
    NotificationReceiveController,
    SendNotificationGuestController
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

        Route::get('notification/send', [SendNotificationGuestController::class, 'index'])
            ->name('notification.send.index');

        Route::get('notification/send/action/event/{id}', [SendNotificationGuestController::class, 'action'])
            ->name('notification.send.action');

        Route::get('notification/receive', NotificationReceiveController::class)
            ->name('notification.receive.index');
    });
