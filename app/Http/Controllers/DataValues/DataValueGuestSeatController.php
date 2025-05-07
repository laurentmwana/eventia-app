<?php

namespace App\Http\Controllers\DataValues;

use App\Models\Guest;
use App\Models\GuestSeat;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;

class DataValueGuestSeatController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $eventId = $request->query->getInt('event');

        $events = Event::query()->findByUserId($user->id);

        $data = ['events' => $events];

        if ($eventId <= 0 || !$events->contains('id', $eventId)) {
            return response()->json([
                'guests' => [],
                'guestSeats' => [],
                ...$data
            ]);
        }

        $guestSeats = GuestSeat::query()->findByEvent($eventId);

        $guests = Guest::query()->findByEvent($eventId);

        return response()->json([
            'guests' => $guests,
            'guestSeats' => $guestSeats,
            ...$data
        ]);
    }
}
