<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use App\Models\Event;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\EventRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $events = Event::query()
            ->with(['guestSeats', 'guests'])
            ->findSearchAndPaginated($request);

        return Inertia::render('event/index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('event/create');
    }

    public function store(EventRequest $request): RedirectResponse
    {
        $user = $request->user();

        DB::transaction(fn() => Event::create([
            'user_id' => $user->id,
            ...$request->validated(),
        ]));

        return redirect()->route('event.index')
            ->with('success', 'votre évènement a bien été créer');
    }

    public function show(string $id): Response
    {
        $event =  Event::query()->findShow($id);

        return Inertia::render('event/show', [
            'event' => $event,
        ]);
    }

    public function edit(string $id)
    {
        $event = Event::findOrFail($id);

        return Inertia::render('event/edit', [
            'event' => $event,
        ]);
    }

    public function update(EventRequest $request, string $id)
    {
        $event = Event::findOrFail($id);

        DB::transaction(fn() => $event->update($request->validated()));

        return redirect()->route('event.index')
            ->with('success', 'votre évènement a bien été modifié');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $event = Event::findOrFail($id);

        $event->delete();

        return redirect()->route('event.index')
            ->with('success', 'votre évènement a bien été supprimé');
    }
}
