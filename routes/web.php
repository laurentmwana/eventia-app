<?php

use App\Http\Controllers\Other\DashboardController;
use App\Http\Controllers\Other\InvitationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/course-info', function () {
    return Inertia::render('course-info');
})->name('course');


Route::get('/invitation/{guestId}', [InvitationController::class, 'index'])
    ->name('invitation.index');

Route::get('/me', function () {
    return Inertia::render('me');
})->name('me');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});
