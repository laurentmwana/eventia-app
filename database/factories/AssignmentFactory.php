<?php

namespace Database\Factories;

use App\Enums\AssignmentTypeEnum;
use App\Models\Guest;
use App\Models\GuestSeat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'guest_id' => Guest::all()->random()->id,
            'guest_seat_id' => GuestSeat::all()->random()->id,
            'type' => $this->faker->randomElement(AssignmentTypeEnum::cases())->value,
        ];
    }
}
