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

        $values = [10, 15, 10, 20, 30, 35, 40, 45, 65, 70, 70, 95, 100,];

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

        $values = [];
        $labels = [];

        for ($i = $daysCount; $i >= 0; $i--) {
            array_push($values, $daysCount - $i + 1);
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

        $values = [26, 27, 28, 29, 30, 31, 32,];

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

        $values = [22, 23, 24, 25, 26, 27,];
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

        $values = [40, 45, 65, 70, 70, 95];
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
            ->get("/api/analytics/newSubscribers?key=year");

        $values = [10, 15, 10, 20, 30, 35, 40, 45, 65, 70, 70, 95, 100,];

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
}
