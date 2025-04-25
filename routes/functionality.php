<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Functionality\EventController;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('event', EventController::class)
            ->parameter('event', 'id');
    });
