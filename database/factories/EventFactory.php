<?php

namespace Database\Factories;

use App\Models\User;
use App\Enums\EventTypeEnum;
use App\Enums\EventStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'type' => $this->faker->randomElement(EventTypeEnum::cases())->value,
            'status' => EventStatusEnum::NEXT->value,
            'start_at' => $this->faker->dateTimeBetween('now', '+1 week'),
            'end_at' => $this->faker->dateTimeBetween('now +1 week', '+2 weeks'),
            'description' => $this->faker->paragraph(),
            'image' => $this->faker->imageUrl(640, 480, 'events', true),
        ];
    }
}
