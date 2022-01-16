<?php

declare(strict_types=1);

namespace Database\Factories\LogEvent;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogEventFactory extends Factory
{
    protected $model = LogEvent::class;

    public function definition()
    {
        return [
            "code" => $this->faker->randomElement(["c_one", "c_two", "c_three", "b_one", "b_two",]),
            "payload" => "",
            "created_at" => $this->faker->dateTimeBetween("-3 months"),
        ];
    }

    public function start(Subscriber $subscriber)
    {
        return $this->state(function (array $attributes) use ($subscriber) {
            return [
                "code" => LogEvent::COMMAND_START,
//                "payload" => $this->faker->randomElement(["yandex", "google", "facebook", null]),
                "created_at" => $subscriber->created_at,
            ];
        });
    }

    public function unhandled()
    {
        return $this->state(function (array $attributes) {
            return [
                "code" => LogEvent::COMMAND_UNHANDLED,
                "payload" => $this->faker->realText(30),
                "subscriber_id" => $this->faker->numberBetween(1,500),
                "created_at" => $this->faker->dateTimeBetween("-3 months"),
            ];
        });
    }

    public function createdAt(string $start, string $end)
    {
        return $this->state(function (array $attributes) use ($start, $end) {
            return [
                "created_at" => $this->faker->dateTimeBetween($start, $end),
            ];
        });
    }

    public function payload(string $payload)
    {
        return $this->state(function (array $attributes) use ($payload) {
            return [
                "payload" => $payload,
            ];
        });
    }
}
