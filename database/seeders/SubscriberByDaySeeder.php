<?php

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SubscriberByDaySeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now()->toImmutable();
        $start = $now->subMonth()->toImmutable();

        $daysCount = $start->diffInDays($now);

        for ($i = $daysCount; $i >= 0; $i--) {
            Subscriber::factory()->subDays($i)->count($daysCount - $i + 1)->create()->each([$this, "addEvent"]);
        }

    }

    public function addEvent(Subscriber $subscriber)
    {
        $event = LogEvent::factory()->start($subscriber)->make();

        /**
         * @var Subscriber $subscriber
         */
        $subscriber->logEvents()->save($event);

        $subscriber->logEvents()->saveMany(
            LogEvent::factory()->createdAt($subscriber->created_at, Carbon::now()->toString())->count(3)->make()
        );
    }
}
