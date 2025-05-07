<?php

use App\Http\Controllers\DataValues\DataValueEnumController;
use App\Http\Controllers\DataValues\DataValueGuestSeatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataValues\DataValueEventController;
use App\Http\Controllers\DataValues\DataValueEventStateController;

Route::name('^')
    ->prefix('/data-value')
    ->group(function () {
        Route::get('/event-state', DataValueEventStateController::class)->name('event.state');

        Route::get('/enumeration', DataValueEnumController::class)
            ->name('enum');

        Route::get('/events-user', DataValueEventController::class)
            ->name('event.user');

        Route::get('/guest-seat/with/guest', DataValueGuestSeatController::class)
            ->name('guest-seat.guest');
    });
