<?php

namespace Database\Factories;

use App\Enums\GuestSeatCategoryEnum;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GuestSeat>
 */
class GuestSeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->sentence,
            'event_id' => Event::all()->random()->id,
            'category' => $this->faker->randomElement(GuestSeatCategoryEnum::cases())->value,
        ];
    }
}
