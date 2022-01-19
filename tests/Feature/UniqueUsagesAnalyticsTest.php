<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Admin\Admin;
use Carbon\Carbon;
use Database\Seeders\AdminSeeder;
use Database\Seeders\SubscriberUniqueUsageByDaysTestSeeder;
use Database\Seeders\SubscriberUniqueUsageByMonthsTestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniqueUsagesAnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function testChartYearAgo()
    {
        $this->seed([
            AdminSeeder::class,
            SubscriberUniqueUsageByMonthsTestSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/uniqueUsages?key=year");

        $values = [30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66,];

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
            SubscriberUniqueUsageByDaysTestSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/uniqueUsages?key=month");

        $now = Carbon::now()->toImmutable();
        $start = $now->subMonth()->toImmutable();

        $daysCount = $start->diffInDays($now);

        $values = [10, 21, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120,];
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
            SubscriberUniqueUsageByDaysTestSeeder::class,
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)
            ->withHeaders([
                "Accept" => "application/json",
            ])
            ->get("/api/analytics/uniqueUsages?key=week");

        $now = Carbon::now()->toImmutable();
        $start = $now->subDays(6)->toImmutable();

        $daysCount = $start->diffInDays($now);

        $values = [102, 105, 108, 111, 114, 117, 120,];

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
            SubscriberUniqueUsageByDaysTestSeeder::class,
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
            ->get("/api/analytics/uniqueUsages?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=day");

        $values = [90, 93, 96, 99, 102, 105,];
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
            SubscriberUniqueUsageByMonthsTestSeeder::class,
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
            ->get("/api/analytics/uniqueUsages?key=customPeriod&from={$start->toDateTimeString()}&to={$end->toDateTimeString()}&step=month");

        $values = [48, 51, 54, 57, 60, 63,];
        $labels = [];

        for ($i = 0; $i < $monthsCount; $i++) {
            array_push($labels, $start->addMonths($i)->format("m-Y"));
        }

        $this->assertEquals($values, $response["data"]);
        $this->assertEquals($labels, $response["labels"]);
    }
}
