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

        $multiplier = 1;

        for ($i = $daysCount; $i >= 0; $i--) {
            // 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128 - 2112
            Subscriber::factory()
                ->subDays($i)
                ->count(4 * $multiplier)
                ->create()
                ->each([$this, "addStartEmptyEvent"])
                ->each([$this, "addUsageEvent"]);

            // 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96 - 1584
            Subscriber::factory()
                ->subDays($i)
                ->count(3 * $multiplier)
                ->create()
                ->each([$this, "addStartGoogleEvent"])
                ->each([$this, "addUsageEvent"]);

            // 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64 - 1056
            Subscriber::factory()
                ->subDays($i)
                ->count(2 * $multiplier)
                ->create()
                ->each([$this, "addStartYandexEvent"])
                ->each([$this, "addUsageEvent"]);

            // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 - 528
            Subscriber::factory()
                ->subDays($i)
                ->count(1 * $multiplier)
                ->create()
                ->each([$this, "addStartFacebookEvent"])
                ->each([$this, "addUsageEvent"]);

            // 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320 - 5280

            $multiplier++;
        }

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
