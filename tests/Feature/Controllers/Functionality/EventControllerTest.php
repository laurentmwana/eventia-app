<?php

namespace Tests\Feature\Controllers\Functionality;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use App\Enums\EventTypeEnum;
use App\Enums\EventStatusEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Crée un utilisateur pour authentification
        $this->user = User::factory()->create();
    }

    public function test_index_displays_events()
    {
        Event::factory()->count(3)->create();

        $response = $this->actingAs($this->user)
            ->get(route('event.index'));

        $response->assertStatus(200);
    }

    public function test_show_displays_event()
    {
        $event = Event::factory()->create();

        $response = $this->actingAs($this->user)->get(route('event.show', $event));

        $response->assertStatus(200);
    }

    public function test_store_creates_event()
    {
        Storage::fake('public');

        $data = [
            'title' => 'Mon événement',
            'type' => EventTypeEnum::WEDDING->value,
            'start_at' => now()->addDay()->toDateTimeString(),
            'end_at' => now()->addDays(2)->toDateTimeString(),
            'description' => 'Description test',
            'image' => UploadedFile::fake()->image('event.jpg'),
        ];

        $response = $this->actingAs($this->user)
            ->post(route('event.store'), $data);

        $response->assertRedirect(route('event.index'));
        $this->assertDatabaseHas('events', [
            'title' => 'Mon événement',
            'description' => 'Description test',
            'user_id' => $this->user->id,
        ]);
    }

    public function test_update_modifies_event()
    {
        Storage::fake('public');

        $event = Event::factory()->create(['user_id' => $this->user->id]);

        $data = [
            'title' => 'Événement mis à jour',
            'type' => EventTypeEnum::WEDDING->value,
            'start_at' => now()->addDays(3)->toDateTimeString(),
            'end_at' => now()->addDays(4)->toDateTimeString(),
            'description' => 'Description mise à jour',
            'image' => UploadedFile::fake()->image('updated.jpg'),
        ];

        $response = $this->actingAs($this->user)->put(route('event.update', $event), $data);

        $response->assertRedirect(route('event.index'));

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'title' => 'Événement mis à jour',
            'description' => 'Description mise à jour',
        ]);
    }

    public function test_destroy_deletes_event()
    {
        $event = Event::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->delete(route('event.destroy', $event), [
                'password' => 'password', // mot de passe par défaut dans tests Laravel
            ]);

        $response->assertRedirect(route('event.index'));
    }
}
