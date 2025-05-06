<?php

use App\Http\Controllers\DataValues\DataValueEnumController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataValues\DataValueEventController;
use App\Http\Controllers\DataValues\DataValueEventStateController;

Route::name('^')
    ->prefix('data-value')
    ->group(function () {
        Route::get('/event-state', DataValueEventStateController::class)->name('event.state');

        Route::get('/events-user', [DataValueEventController::class, 'eventsUser'])
            ->name('event.user');

        Route::get('/enumeration', DataValueEnumController::class)
            ->name('enum');
    });
