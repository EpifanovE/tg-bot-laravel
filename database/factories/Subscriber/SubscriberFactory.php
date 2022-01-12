<?php

namespace Database\Factories\Subscriber;

use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriberFactory extends Factory
{
    protected $model = Subscriber::class;

    public function definition()
    {
        return [
            "tid" => $this->faker->numberBetween(100, 999),
            "first_name" => $this->faker->name,
            "last_name" => $this->faker->lastName,
            "username" => $this->faker->userName,
            "language_code" => "ru",
            "blocked" => false,
            "created_at" => $this->faker->dateTimeBetween("-1 year", now()),
        ];
    }
}
