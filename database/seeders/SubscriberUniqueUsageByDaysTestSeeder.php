<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SubscriberUniqueUsageByDaysTestSeeder extends Seeder
{
    public function run() {
        $addition = 0;

        for($i = 31; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toImmutable();

            Subscriber::factory()->count(10 + $addition)->createdAt($date->toString())->create()->each(function (Subscriber $subscriber) use ($date) {
                $subscriber->logEvents()->saveMany(
                    LogEvent::factory()->start($subscriber)->count(1)->make()
                );
                $subscriber->logEvents()->saveMany(
                    LogEvent::factory()->createdAt($date->toString())->count(1)->make()
                );
                $subscriber->logEvents()->saveMany(
                    LogEvent::factory()->createdAt($date->addDays(1)->toString())->count(2)->make()
                );
                $subscriber->logEvents()->saveMany(
                    LogEvent::factory()->createdAt($date->addDays(2)->toString())->count(2)->make()
                );
            });

            $addition++;
        }
    }
}
