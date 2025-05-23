<?php

namespace Tests\Feature\Controllers\Functionality;

use App\Models\User;
use App\Models\Guest;
use App\Models\GuestSeat;
use App\Models\Assignment;
use App\Enums\AssignmentTypeEnum;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssignmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected GuestSeat $guestSeat;
    protected Guest $guest;

    protected Event  $event;

    protected function setUp(): void
    {
        parent::setUp();

        // Crée et connecte un utilisateur
        $this->user = User::factory()->create();
        $this->actingAs($this->user);

        $this->event = Event::factory()->create(['user_id' => $this->user->id]);

        // Crée un invité et une place
        $this->guest = Guest::factory()->create();
        $this->guestSeat = GuestSeat::factory()->create();
    }

    public function test_index_displays_assignments()
    {
        Assignment::factory()->count(1)->create([
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
        ]);

        $response = $this->get(route('assignment.index'));

        $response->assertStatus(200);
    }

    public function test_create_displays_form()
    {
        $response = $this->get(route('assignment.create'));

        $response->assertStatus(200);
    }

    public function test_store_creates_assignment_and_redirects()
    {
        $payload = [
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
            'event_id' => $this->event->id,
        ];

        $response = $this->post(route('assignment.store'), $payload);

        $response->assertRedirect(route('assignment.index'));
        $response->assertSessionHas('success', ' Une place a été assignée à un invité.');

        $this->assertDatabaseHas('assignments', [
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
        ]);
    }

    public function test_show_displays_guest_seat()
    {
        $assignment = $this->getAssignment();

        $response = $this->get(route('assignment.show', $assignment->id));

        $response->assertStatus(200);
    }

    public function test_edit_displays_edit_form()
    {
        $assignment = $this->getAssignment();

        $response = $this->get(route('assignment.edit', $assignment->id));

        $response->assertStatus(200);
    }

    public function test_update_modifies_assignment_and_redirects()
    {
        $assignment = Assignment::factory()->create([
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
        ]);

        $payload = [
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
            'event_id' => $this->event->id,
        ];

        $response = $this->put(route('assignment.update', $assignment->id), $payload);

        $response->assertRedirect(route('assignment.index'));
        $response->assertSessionHas('success', 'Une place assignée à un invité a été mis à jour');

        $this->assertDatabaseHas('assignments', [
            'id' => $assignment->id,
            'type' => AssignmentTypeEnum::LONELY->value,
        ]);
    }

    public function test_destroy_requires_password_and_deletes_guest_seat()
    {
        $assignment = $this->getAssignment();

        $response = $this->delete(route('assignment.destroy', $assignment->id), [
            'password' => 'password', // mot de passe par défaut factory User
        ]);

        $response->assertRedirect(route('assignment.index'));
        $response->assertSessionHas('success', 'Une place a été désassignée à un invité.');

        $this->assertDatabaseMissing('assignments', ['id' => $assignment->id]);
    }

    public function test_destroy_fails_with_wrong_password()
    {
        $assignment = $this->getAssignment();

        $response = $this->from(route('assignment.index'))->delete(route('assignment.destroy', $assignment->id), [
            'password' => 'wrongpassword',
        ]);

        $response->assertRedirect(route('assignment.index'));
        $response->assertSessionHasErrors('password');
    }

    private function getAssignment()
    {
        return      Assignment::factory()->create([
            'guest_id' => $this->guest->id,
            'guest_seat_id' => $this->guestSeat->id,
            'type' => AssignmentTypeEnum::LONELY->value,
        ]);
    }
}
