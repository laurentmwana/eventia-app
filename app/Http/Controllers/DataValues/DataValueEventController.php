<?php

namespace App\Http\Controllers\DataValues;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Enums\EventStatusEnum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class DataValueEventController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $events = Event::quert()->findByUserId($user->id);

        return response()->json($events);
    }
}
