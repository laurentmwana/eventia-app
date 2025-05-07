<?php

namespace App\Http\Controllers\Other;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('dashboard/index', [
            'countEvents' => 12,
            'countGuestSeats' => 40,
            'countGuests' => 600,
        ]);
    }
}
