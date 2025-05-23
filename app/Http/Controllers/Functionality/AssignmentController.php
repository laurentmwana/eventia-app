<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\GuestSeat;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\AssignmentRequest;

class AssignmentController extends Controller
{
    public function index(Request $request): Response
    {
        $assignments = Assignment::query()
            ->with(['guest', 'guestSeat'])
            ->findSearchAndPaginated($request);

        return Inertia::render('assignment/index', [
            'assignments' => $assignments,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('assignment/create');
    }

    public function store(AssignmentRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $dto = $request->toDto();

            Assignment::create([
                'type' => $dto->type->value,
                'guest_id' => $dto->guestId,
                'guest_seat_id' => $dto->guestSeatId,
            ]);
        });

        return redirect()->route('assignment.index')
            ->with('success', ' Une place a été assignée à un invité.');
    }

    public function show(string $id): Response
    {
        $assignment =  Assignment::query()->findShow($id);

        return Inertia::render('assignment/show', [
            'assignment' => $assignment,
        ]);
    }

    public function edit(string $id)
    {
        $assignment = Assignment::query()->findShowEdit($id);

        return Inertia::render('assignment/edit', [
            'assignment' => $assignment,
        ]);
    }

    public function update(AssignmentRequest $request, string $id)
    {
        $assignment = Assignment::findOrFail($id);

        DB::transaction(function () use ($request, $assignment) {
            $dto = $request->toDto();

            $assignment->update([
                'type' => $dto->type->value,
                'guest_id' => $dto->guestId,
                'guest_seat_id' => $dto->guestSeatId,
            ]);
        });


        return redirect()->route('assignment.index')
            ->with('success', 'Une place assignée à un invité a été mis à jour');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $guestSeat = GuestSeat::findOrFail($id);

        $guestSeat->delete();

        return redirect()->route('assignment.index')
            ->with('success', 'Une place a été désassignée à un invité.');
    }
}
