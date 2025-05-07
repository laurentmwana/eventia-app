<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NotificationReceiveController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->orderByDesc('updated_at')
            ->paginate();

        return Inertia::render('notification/receive/index', [
            'notifications' => $notifications
        ]);
    }
}
