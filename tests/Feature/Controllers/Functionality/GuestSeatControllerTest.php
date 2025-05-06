<?php

namespace Tests\Feature\Controllers\Functionality;

use App\Enums\GuestSeatCategoryEnum;
use App\Models\User;
use App\Models\Event;
use App\Models\GuestSeat;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GuestSeatControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Event $event;

    protected function setUp(): void
    {
        parent::setUp();

        // Crée un utilisateur et connecte-le
        $this->user = User::factory()->create();
        $this->actingAs($this->user);

        // Crée un événement pour les tests
        $this->event = Event::factory()->create();
    }

    public function test_index_displays_guest_seats()
    {
        GuestSeat::factory()->count(3)->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest-seat.index'));

        $response->assertStatus(200);
    }

    public function test_create_displays_form()
    {
        $response = $this->get(route('guest-seat.create'));

        $response->assertStatus(200);
    }

    public function test_store_creates_guest_seat_and_redirects()
    {
        $payload = [
            'name' => 'Table VIP',
            'description' => 'Place proche de la scène',
            'event_id' => $this->event->id,
            'category' => GuestSeatCategoryEnum::NORMAL->value,
        ];

        $response = $this->post(route('guest-seat.store'), $payload);

        $response->assertRedirect(route('guest-seat.index'));
        $response->assertSessionHas('success', "une place d'un invité a été ajouté");

        $this->assertDatabaseHas('guest_seats', [
            'name' => 'Table VIP',
            'description' => 'Place proche de la scène',
            'event_id' => $this->event->id,
        ]);
    }

    public function test_show_displays_guest_seat()
    {
        $guestSeat = GuestSeat::factory()->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest-seat.show', $guestSeat->id));

        $response->assertStatus(200);
    }

    public function test_edit_displays_edit_form()
    {
        $guestSeat = GuestSeat::factory()->create(['event_id' => $this->event->id]);

        $response = $this->get(route('guest-seat.edit', $guestSeat->id));

        $response->assertStatus(200);
    }

    public function test_update_modifies_guest_seat_and_redirects()
    {
        $guestSeat = GuestSeat::factory()->create(['event_id' => $this->event->id]);

        $payload = [
            'name' => 'Table Modifiée',
            'description' => 'Description modifiée',
            'event_id' => $this->event->id,
            'category' => GuestSeatCategoryEnum::NORMAL->value,

        ];

        $response = $this->put(route('guest-seat.update', $guestSeat->id), $payload);

        $response->assertRedirect(route('guest-seat.index'));
        $response->assertSessionHas('success', "une place de l'invité a bien été modifié");

        $this->assertDatabaseHas('guest_seats', [
            'id' => $guestSeat->id,
            'name' => 'Table Modifiée',
            'description' => 'Description modifiée',
        ]);
    }

    public function test_destroy_requires_password_and_deletes_guest_seat()
    {
        $guestSeat = GuestSeat::factory()->create(['event_id' => $this->event->id]);

        // Envoie la requête avec le mot de passe correct
        $response = $this->delete(route('guest-seat.destroy', $guestSeat->id), [
            'password' => 'password', // mot de passe par défaut factory User
        ]);

        $response->assertRedirect(route('guest-seat.index'));
        $response->assertSessionHas('success', "une place pour un  invité a été supprimé");

        $this->assertDatabaseMissing('guest_seats', ['id' => $guestSeat->id]);
    }

    public function test_destroy_fails_with_wrong_password()
    {
        $guestSeat = GuestSeat::factory()->create(['event_id' => $this->event->id]);

        $response = $this->from(route('guest-seat.index'))->delete(route('guest-seat.destroy', $guestSeat->id), [
            'password' => 'wrongpassword',
        ]);

        $response->assertRedirect(route('guest-seat.index'));
        $response->assertSessionHasErrors('password');

        $this->assertDatabaseHas('guest_seats', ['id' => $guestSeat->id]);
    }
}
