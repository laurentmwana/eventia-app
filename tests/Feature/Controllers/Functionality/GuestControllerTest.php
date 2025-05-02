<?php

namespace Tests\Feature\Controllers\Functionality;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use App\Models\Guest;
use App\Enums\GenderEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GuestControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Event $event;

    protected function setUp(): void
    {
        parent::setUp();

        // Crée un utilisateur pour authentification
        $this->user = User::factory()->create();

        // Crée un événement associé aux invités
        $this->event = Event::factory()->create(['user_id' => $this->user->id]);

        // Authentifie l'utilisateur
        $this->actingAs($this->user);
    }

    public function test_index_displays_guests()
    {
        Guest::factory()->count(3)->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn($assert) => $assert->component('guest/index'));
    }

    public function test_create_returns_inertia_view()
    {
        $response = $this->get(route('guest.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn($assert) => $assert->component('guest/create'));
    }

    public function test_store_creates_guest()
    {
        Storage::fake('public');

        $data = [
            'name' => 'Doe',
            'firstname' => 'John',
            'phone' => '1234567890',
            'gender' => GenderEnum::MALE->value,
            'event_id' => $this->event->id,
            'avatar' => UploadedFile::fake()->image('guest.jpg'),
        ];

        $response = $this->post(route('guest.store'), $data);

        $response->assertRedirect(route('guest.index'));
        $this->assertDatabaseHas('guests', [
            'name' => 'Doe',
            'firstname' => 'John',
            'phone' => '1234567890',
            'gender' => GenderEnum::MALE->value,
            'event_id' => $this->event->id,
        ]);
    }

    public function test_show_displays_guest()
    {
        $guest = Guest::factory()->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest.show', $guest->id));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($assert) => $assert->component('guest/show')
                ->has('event')
        );
    }

    public function test_edit_returns_inertia_view()
    {
        $guest = Guest::factory()->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest.edit', $guest->id));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($assert) => $assert->component('guest/edit')
                ->has('guest')
        );
    }

    public function test_update_modifies_guest()
    {
        Storage::fake('public');

        $guest = Guest::factory()->create(['event_id' => $this->event->id]);

        $data = [
            'name' => 'Doe Updated',
            'firstname' => 'John Updated',
            'phone' => '0987654321',
            'gender' => GenderEnum::FEMALE->value,
            'event_id' => $this->event->id,
            'avatar' => UploadedFile::fake()->image('guest_updated.jpg'),
        ];

        $response = $this->put(route('guest.update', $guest->id), $data);

        $response->assertRedirect(route('guest.index'));

        $this->assertDatabaseHas('guests', [
            'id' => $guest->id,
            'name' => 'Doe Updated',
            'firstname' => 'John Updated',
            'phone' => '0987654321',
            'gender' => GenderEnum::FEMALE->value,
            'event_id' => $this->event->id,
        ]);
    }

    public function test_destroy_deletes_guest()
    {
        $guest = Guest::factory()->create(['event_id' => $this->event->id]);

        $response = $this->delete(route('guest.destroy', $guest->id), [
            'password' => 'password', // mot de passe par défaut dans tests Laravel
        ]);

        $response->assertRedirect(route('guest.index'));
        $this->assertDatabaseMissing('guests', [
            'id' => $guest->id,
        ]);
    }
}
