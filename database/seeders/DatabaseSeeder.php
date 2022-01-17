<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(AdminSeeder::class);
//        $this->call(SubscriberSeeder::class);
//        $this->call(SubscriberByDaySeeder::class);
//        $this->call(SubscriberUniqueUsageByMonthsTestSeeder::class);
        $this->call(SubscriberUniqueUsageByDaysTestSeeder::class);
    }
}
