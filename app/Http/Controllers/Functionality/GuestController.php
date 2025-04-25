<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GuestRequest;
use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\RedirectResponse;

class GuestController extends Controller
{
    public function index(Request $request): Response
    {
        $events = Guest::query()
            ->with(['user', 'event'])
            ->findSearchAndPaginated($request);

        return Inertia::render('guest/index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('guest/create');
    }

    public function store(GuestRequest $request): RedirectResponse
    {
        $user = $request->user();

        DB::transaction(fn() => Guest::create([
            'user_id' => $user->id,
            ...$request->validated(),
        ]));

        return redirect()->route('guest.index')
            ->with('success', 'un invité ajouté dans l\'évènement');
    }

    public function show(string $id): Response
    {
        $event =  Guest::query()->findShow($id);

        return Inertia::render('guest/show', [
            'event' => $event,
        ]);
    }

    public function edit(string $id)
    {
        $guest = Guest::findOrFail($id);

        return Inertia::render('guest/edit', [
            'guest' => $guest,
        ]);
    }

    public function update(GuestRequest $request, string $id)
    {
        $guest = Guest::findOrFail($id);

        DB::transaction(fn() => $guest->update($request->validated()));

        return redirect()->route('guest.index')
            ->with('success', 'les informations de l\'invité a bien été modifié');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $guest = Guest::findOrFail($id);

        $guest->delete();

        return redirect()->route('guest.index')
            ->with('success', 'un invité a été supprimé');
    }
}
