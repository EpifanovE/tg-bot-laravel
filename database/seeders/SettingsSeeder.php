<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    public function run()
    {
        DB::table("settings")->insert([
            [
                "code" => "analytics",
                "payload" => json_encode([
                    "events" => config("bot.events"),
                ]),
                "created_at" => Carbon::now(),
            ]
        ]);
    }
}
