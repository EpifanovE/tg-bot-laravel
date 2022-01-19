<?php

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        $multiplier = 1;

        for($i = 12; $i >= 0; $i--) {
            // 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78 - 546
            Subscriber::factory()
                ->subMonths($i)
                ->count(6 * $multiplier)
                ->create()
                ->each([$this, "addStartEmptyEvent"])
                ->each([$this, "addUsageEvent"]);

            // 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39 - 273
            Subscriber::factory()
                ->subMonths($i)
                ->count(3 * $multiplier)
                ->create()
                ->each([$this, "addStartGoogleEvent"])
                ->each([$this, "addUsageEvent"]);

            // 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26 - 182
            Subscriber::factory()
                ->subMonths($i)
                ->count(2 * $multiplier)
                ->create()
                ->each([$this, "addStartYandexEvent"])
                ->each([$this, "addUsageEvent"]);

            // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 - 91
            Subscriber::factory()
                ->subMonths($i)
                ->count(1 * $multiplier)
                ->create()
                ->each([$this, "addStartFacebookEvent"])
                ->each([$this, "addUsageEvent"]);

            // 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156 - 1092

            $multiplier++;
        }

        LogEvent::factory()
            ->unhandled()
            ->count(500)
            ->create();
    }

    public function addStartGoogleEvent(Subscriber $subscriber)
    {
        $subscriber->logEvents()->save(LogEvent::factory()->start($subscriber)->payload("google")->make());
    }

    public function addStartYandexEvent(Subscriber $subscriber)
    {
        $subscriber->logEvents()->save(LogEvent::factory()->start($subscriber)->payload("yandex")->make());
    }

    public function addStartFacebookEvent(Subscriber $subscriber)
    {
        $subscriber->logEvents()->save(LogEvent::factory()->start($subscriber)->payload("facebook")->make());
    }

    public function addStartEmptyEvent(Subscriber $subscriber)
    {
        $subscriber->logEvents()->save(LogEvent::factory()->start($subscriber)->make());
    }

    public function addUsageEvent(Subscriber $subscriber)
    {
        $subscriber->logEvents()->saveMany(
            LogEvent::factory()->createdAt($subscriber->created_at, $subscriber->created_at)->count(2)->make()
        );
    }
}
