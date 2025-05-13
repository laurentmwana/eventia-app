<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Jobs\NotifiedGuestJob;
use App\Http\Controllers\Controller;

class SendNotificationGuestController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::query()->findByInvitationPaginated($request);

        return Inertia::render('notification/send/index', [
            'events' => $events
        ]);
    }

    public function send(int $id, Request $request)
    {
        if ($eventId === 0) {
            throw new \Exception("Vous devez selectionner un évènement (:");
        }

        $event = Event::findByEventNotified($eventId);

        foreach ($event->guests as $guest) {
            NotifiedGuestJob::dispatch($guest);
        }

        return redirect()
            ->route('notified-guest.index')
            ->with('success', 'Les invitations ont été envoyées avec succès :)');
    }
}
