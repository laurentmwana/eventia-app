<?php

namespace Database\Factories;

use App\Enums\GenderEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guest>
 */
class GuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'firstname' => $this->faker->firstName(),
            'phone' => $this->faker->phoneNumber(),
            'gender' => $this->faker->randomElement(GenderEnum::cases())->value,
            'avatar' => $this->faker->imageUrl(640, 480, 'avatars', true),
        ];
    }
}
