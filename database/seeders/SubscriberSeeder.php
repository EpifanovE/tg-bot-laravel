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
        Subscriber::factory()->subMonth(12)->count(10)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(11)->count(15)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(10)->count(10)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(9)->count(20)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(8)->count(30)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(7)->count(35)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(6)->count(40)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(5)->count(45)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(4)->count(65)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(3)->count(70)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(2)->count(70)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(1)->count(95)->create()->each([$this, "addEvent"]);
        Subscriber::factory()->subMonth(0)->count(100)->create()->each([$this, "addEvent"]);

//        Subscriber::factory()
//            ->count(1000)
//            ->create()
//            ->each([$this, "addEvent"]);

//        LogEvent::factory()
//            ->unhandled()
//            ->count(500)
//            ->create();
    }

    public function addEvent(Subscriber $subscriber)
    {
        $event = LogEvent::factory()->start($subscriber)->make();
//        $event->created_at = $subscriber->created_at;

        /**
         * @var Subscriber $subscriber
         */
        $subscriber->logEvents()->save($event);

//        $eventsCount = random_int(1,5);
//        $subscriber->logEvents()->saveMany(
//            LogEvent::factory()->count($eventsCount)->make()
//        );
    }
}
