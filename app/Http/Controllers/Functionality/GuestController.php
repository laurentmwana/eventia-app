<?php

namespace App\Http\Controllers\Functionality;

use Inertia\Inertia;
use App\Models\Guest;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GuestRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Upload\FileUploadAction;

class GuestController extends Controller
{
    private const PATH_IMAGE = "guests";

    public function __construct(private FileUploadAction $upload) {}

    public function index(Request $request): Response
    {
        $guests = Guest::query()
            ->with(['event', 'assignment'])
            ->findSearchAndPaginated($request);

        return Inertia::render('guest/index', [
            'guests' => $guests,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('guest/create');
    }

    public function store(GuestRequest $request): RedirectResponse
    {
        DB::transaction(
            function () use ($request) {
                $dto = $request->toDto();

                $avatarUrl = $this->upload->handle(
                    self::PATH_IMAGE,
                    $dto->avatar,
                );

                Guest::create([
                    'name' => $dto->name,
                    'firstname' => $dto->firstname,
                    'phone' => $dto->phone,
                    'gender' => $dto->gender,
                    'event_id' => $dto->eventId,
                    'avatar' => $avatarUrl,
                ]);
            }
        );

        return redirect()->route('guest.index')
            ->with('success', 'un invité ajouté dans l\'évènement');
    }

    public function show(string $id): Response
    {
        $guest =  Guest::query()->findShow($id);

        return Inertia::render('guest/show', [
            'guest' => $guest,
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

        DB::transaction(
            function () use ($request, $guest) {
                $dto = $request->toDto();

                $avatarUrl = $this->upload->handle(
                    self::PATH_IMAGE,
                    $dto->avatar,
                    $guest->avatar
                );

                $guest->update([
                    'name' => $dto->name,
                    'firstname' => $dto->firstname,
                    'phone' => $dto->phone,
                    'gender' => $dto->gender,
                    'event_id' => $dto->eventId,
                    'avatar' => $avatarUrl,
                ]);
            }
        );

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
