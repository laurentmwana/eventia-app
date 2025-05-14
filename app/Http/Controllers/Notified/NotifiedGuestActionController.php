<?php

namespace App\Http\Controllers\Notified;

use Inertia\Inertia;
use App\Models\Event;
use Inertia\Response;
use App\Models\Assignment;
use Illuminate\Http\Request;
use App\Jobs\NotifiedGuestJob;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\EventNotifiedRequest;

class NotifiedGuestActionController extends Controller
{

    public function index(Request $request): Response
    {
        $assignments = Assignment::query()
            ->with(['guest', 'guestSeat', 'guest.event'])
            ->findPaginatedAndFilters($request);

        return Inertia::render('notified-guest/index', [
            'assignments' => $assignments
        ]);
    }

    public function notified(EventNotifiedRequest $request): RedirectResponse
    {
        $dto = $request->toDto();

        $event = Event::findByEventNotified($dto->eventId);

        foreach ($event->guests as $guest) {
            NotifiedGuestJob::dispatch($guest);
        }

        return redirect()
            ->route('notified-guest.index')
            ->with('success', 'Les invitations ont été envoyées avec succès :)');
    }

}
