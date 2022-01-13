<?php

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        Subscriber::factory()->count(1000)->create()->each(function ($subscriber) {

            $event = LogEvent::factory()->make();
            $event->created_at = $subscriber->created_at;

            /**
             * @var Subscriber $subscriber
             */
            $subscriber->events()->save($event);
        });
    }
}
