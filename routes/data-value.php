<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataValues\{
    DataValueStatisticEventController,
    DataValueEventStateController,
    DataValueEventController,
    DataValueGuestSeatController,
    DataValueEnumController
};

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

        Route::get('/statistics/monthly', [DataValueStatisticEventController::class, 'getMonthlyStatistics'])
            ->name('statistic.monthly');
        Route::get('/statistics/seat-categories', [DataValueStatisticEventController::class, 'getSeatCategoryStatistics'])
            ->name('statistic.seat');
        Route::get('/statistics/event-types', [DataValueStatisticEventController::class, 'getEventTypeStatistics'])
            ->name('statistic.event');
    });
