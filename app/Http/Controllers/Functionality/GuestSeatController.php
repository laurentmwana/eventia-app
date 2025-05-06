<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GuestSeatRequest;
use App\Http\Controllers\Controller;
use App\Models\GuestSeat;
use Illuminate\Http\RedirectResponse;

class GuestSeatController extends Controller
{
    public function index(Request $request): Response
    {
        $guestSeats = GuestSeat::query()
            ->with(['event', 'assignments'])
            ->findSearchAndPaginated($request);

        return Inertia::render('guest-seat/index', [
            'guestSeats' => $guestSeats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('guest-seat/create');
    }

    public function store(GuestSeatRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $dto = $request->toDto();

            GuestSeat::create([
                'name' => $dto->name,
                'description' => $dto->description,
                'category' => $dto->category->value,
                'event_id' => $dto->eventId,
            ]);
        });

        return redirect()->route('guest-seat.index')
            ->with('success', 'une place d\'un invité a été ajouté');
    }

    public function show(string $id): Response
    {
        $guestSeat =  GuestSeat::query()->findShow($id);

        return Inertia::render('guest-seat/show', [
            'guestSeat' => $guestSeat,
        ]);
    }

    public function edit(string $id)
    {
        $guestSeat = GuestSeat::findOrFail($id);

        return Inertia::render('guest-seat/edit', [
            'guestSeat' => $guestSeat,
        ]);
    }

    public function update(GuestSeatRequest $request, string $id)
    {
        $guestSeat = GuestSeat::findOrFail($id);

        DB::transaction(function () use ($request, $guestSeat) {
            $dto = $request->toDto();

            $guestSeat->update([
                'name' => $dto->name,
                'description' => $dto->description,
                'event_id' => $dto->eventId,
            ]);
        });

        return redirect()->route('guest-seat.index')
            ->with('success', 'une place de l\'invité a bien été modifié');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $guestSeat = GuestSeat::findOrFail($id);

        $guestSeat->delete();

        return redirect()->route('guest-seat.index')
            ->with('success', 'une place pour un  invité a été supprimé');
    }
}
