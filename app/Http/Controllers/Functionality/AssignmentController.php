<?php

namespace App\Http\Controllers\Functionality;

use index;
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
        DB::transaction(
            fn() => GuestSeat::create($request->validated())
        );

        return redirect()->route('assignment.index')
            ->with('success', ' Une place a été assignée à un invité.');
    }

    public function show(string $id): Response
    {
        $guestSeat =  GuestSeat::query()->findShow($id);

        return Inertia::render('assignment/show', [
            'guestSeat' => $guestSeat,
        ]);
    }

    public function edit(string $id)
    {
        $guestSeat = GuestSeat::findOrFail($id);

        return Inertia::render('assignment/edit', [
            'guestSeat' => $guestSeat,
        ]);
    }

    public function update(AssignmentRequest $request, string $id)
    {
        $guestSeat = GuestSeat::findOrFail($id);

        DB::transaction(
            fn() => $guestSeat->update($request->validated())
        );

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
