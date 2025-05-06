<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Event;
use App\Models\Guest;
use App\Models\GuestSeat;
use App\Models\Assignment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Laurent',
            'email' => 'labeya@gmail.com',
        ]);

        User::factory(30)->create();

        foreach (User::all() as $user) {
            Event::factory(3)->create([
                'user_id' => $user->id
            ]);
        }

        foreach (Event::all() as $event) {
            Guest::factory(10)->create([
                'event_id' => $event->id
            ]);
        }

        GuestSeat::factory()->create();

        Assignment::factory()->create();
    }
}
