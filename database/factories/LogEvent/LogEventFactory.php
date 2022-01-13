<?php

declare(strict_types=1);

namespace Database\Factories\LogEvent;

use App\Models\LogEvent\LogEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogEventFactory extends Factory
{
    protected $model = LogEvent::class;

    public function definition()
    {
        return [
            "code" => LogEvent::COMMAND_START,
            "payload" => $this->faker->randomElement(["yandex", "google", "facebook", null]),
        ];
    }
}
