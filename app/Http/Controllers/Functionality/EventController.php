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
use App\Services\Upload\FileUploadAction;

class EventController extends Controller
{
    private const PATH_IMAGE = "events";

    public function __construct(private FileUploadAction $upload) {}
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

        $dto = $request->toDto();

        $imageUrl = $this->upload->handle(
            self::PATH_IMAGE,
            $dto->image,
        );

        DB::transaction(fn() => Event::create([
            'user_id' => $user->id,
            'title' => $dto->title,
            'type' => $dto->type->value,
            'start_at' => $dto->startAt,
            'end_at' => $dto->endAt,
            'description' => $dto->description,
            'image' => $imageUrl,
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

        DB::transaction(function () use ($event, $request) {

            $dto = $request->toDto();

            $imageUrl = $this->upload->handle(
                self::PATH_IMAGE,
                $dto->image,
                $event->image
            );

            $event->update([
                'title' => $dto->title,
                'type' => $dto->type->value,
                'start_at' => $dto->startAt,
                'end_at' => $dto->endAt,
                'description' => $dto->description,
                'image' => $imageUrl,
            ]);
        });


        return redirect()->route('event.index')
            ->with('success', 'votre évènement a bien été modifié');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $event = Event::findOrFail($id);

        DB::transaction(function () use ($event) {

            $state = $event->delete();

            if ($state) {
                $this->upload->fileUpload->delete($event->image);
            }
        });


        return redirect()->route('event.index')
            ->with('success', 'votre évènement a bien été supprimé');
    }
}
