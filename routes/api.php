<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiEventStateController;

Route::name('^')
    ->group(function () {
        Route::get('/event-state', ApiEventStateController::class)->name('event.state');
    });
