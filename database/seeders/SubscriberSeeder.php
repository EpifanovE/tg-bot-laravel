<?php

namespace Database\Seeders;

use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        Subscriber::factory()->count(1000)->create();
    }
}
