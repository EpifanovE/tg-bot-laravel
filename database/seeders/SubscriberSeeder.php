<?php

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        Subscriber::factory()->subMonths(12)->count(10)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(11)->count(15)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(10)->count(10)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(9)->count(20)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(8)->count(30)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(7)->count(35)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(6)->count(40)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(5)->count(45)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(4)->count(65)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(3)->count(70)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(2)->count(70)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(1)->count(95)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonths(0)->count(100)->create()->each([$this, "addEvent"]);

//        LogEvent::factory()
//            ->unhandled()
//            ->count(500)
//            ->create();
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
