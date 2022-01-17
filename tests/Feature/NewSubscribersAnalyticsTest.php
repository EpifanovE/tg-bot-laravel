<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Admin\Admin;
use Carbon\Carbon;
use Database\Seeders\AdminSeeder;
use Database\Seeders\SubscriberByDaySeeder;
use Database\Seeders\SubscriberSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewSubscribersAnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function testChartYearAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribers?key=year");

        $values = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156,];

        $now = Carbon::now()->toImmutable();
        $start = $now->subYear()->toImmutable();

        $monthsCount = $start->diffInMonths($now);

        $labels = [
            $start->format("m-Y"),
        ];

        for ($i = 1; $i <= $monthsCount; $i++) {
            array_push($labels, $start->addMonths($i)->format("m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }

    public function testChartMonthAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribers?key=month");

        $now = Carbon::now()->toImmutable();
        $start = $now->subMonth()->toImmutable();

        $daysCount = $start->diffInDays($now);

        $values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320];
        $labels = [];

        for ($i = $daysCount; $i >= 0; $i--) {
            array_push($labels, $now->subDays($i)->format("d-m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }

    public function testChartWeekAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribers?key=week");

        $now = Carbon::now()->toImmutable();
        $start = $now->subDays(6)->toImmutable();

        $daysCount = $start->diffInDays($now);

        $values = [260, 270, 280, 290, 300, 310, 320,];

        $labels = [];

        for ($i = $daysCount; $i >= 0; $i--) {
            array_push($labels, $now->subDays($i)->format("d-m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }

    public function testChartCustomByDay()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $now = Carbon::now()->toImmutable();

        $start = $now->subDays(10)->toImmutable();
        $end = $now->subDays(5)->toImmutable();
        $daysCount = $start->diffInDays($end);

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribers?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=day");

        $values = [220, 230, 240, 250, 260, 270,];
        $labels = [];

        for ($i = 0; $i <= $daysCount; $i++) {
            array_push($labels, $start->addDays($i)->format("d-m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }

    public function testChartCustomByMonth()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $now = Carbon::now()->toImmutable();

        $start = $now->subMonths(6)->startOfMonth()->toImmutable();
        $end = $now->subMonths(1)->endOfMonth()->toImmutable();

        $monthsCount = $start->diffInMonths($end);

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribers?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=month");

        $values = [84, 96, 108, 120, 132, 144,];
        $labels = [];

        for ($i = 0; $i < $monthsCount; $i++) {
            array_push($labels, $start->addMonths($i)->format("m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }

    public function testTableYearAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribersTable?key=year");

        $values = [
            [
                "count" => 546,
                "payload" => "",
            ],
            [
                "count" => 273,
                "payload" => "google",
            ],
            [
                "count" => 182,
                "payload" => "yandex",
            ],
            [
                "count" => 91,
                "payload" => "facebook",
            ],
        ];

        $this->assertEquals($values, $response->json());
    }

    public function testTableMonthAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribersTable?key=month");

        $values = [
            [
                "count" => 2112,
                "payload" => "",
            ],
            [
                "count" => 1584,
                "payload" => "google",
            ],
            [
                "count" => 1056,
                "payload" => "yandex",
            ],
            [
                "count" => 528,
                "payload" => "facebook",
            ],
        ];

        $this->assertEquals($values, $response->json());
    }

    public function testTableWeekAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribersTable?key=week");

        $values = [
            [
                "count" => 812,
                "payload" => "",
            ],
            [
                "count" => 609,
                "payload" => "google",
            ],
            [
                "count" => 406,
                "payload" => "yandex",
            ],
            [
                "count" => 203,
                "payload" => "facebook",
            ],
        ];

        $this->assertEquals($values, $response->json());
    }

    public function testTableCustomByDay()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberByDaySeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $now = Carbon::now()->toImmutable();

        $start = $now->subDays(10)->toImmutable();
        $end = $now->subDays(5)->toImmutable();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribersTable?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=day");

        $values = [
            [
                "count" => 588,
                "payload" => "",
            ],
            [
                "count" => 441,
                "payload" => "google",
            ],
            [
                "count" => 294,
                "payload" => "yandex",
            ],
            [
                "count" => 147,
                "payload" => "facebook",
            ],
        ];

        $this->assertEquals($values, $response->json());
    }

    public function testTableCustomByMonth()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $now = Carbon::now()->toImmutable();

        $start = $now->subMonths(6)->startOfMonth()->toImmutable();
        $end = $now->subMonths(1)->endOfMonth()->toImmutable();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/newSubscribersTable?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=month");

        $values = [
            [
                "count" => 342,
                "payload" => "",
            ],
            [
                "count" => 171,
                "payload" => "google",
            ],
            [
                "count" => 114,
                "payload" => "yandex",
            ],
            [
                "count" => 57,
                "payload" => "facebook",
            ],
        ];

        $this->assertEquals($values, $response->json());
    }
}
