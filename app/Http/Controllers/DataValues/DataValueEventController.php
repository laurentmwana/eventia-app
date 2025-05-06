<?php

namespace App\Http\Controllers\DataValues;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Enums\EventStatusEnum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DataValueEventController extends Controller
{
    public function eventsUser(Request $request): JsonResponse
    {
        $user = Auth::user();

        $events = Event::where('user_id', '=', $user->id)
            ->whereIn('status', [
                EventStatusEnum::PENDING->value,
                EventStatusEnum::NEXT->value,
            ])
            ->get(['title', 'status', 'id']);

        return response()->json($events);
    }
}
