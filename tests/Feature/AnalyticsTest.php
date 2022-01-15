<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Admin\Admin;
use App\Models\Subscriber\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function testNewSubscribers()
    {
        $this->seed();

        $admin = Admin::where("email", "workeev@gmail.com")->first();

        $response = $this->actingAs($admin)->get("/api/analytics/newSubscribers?key=year");

        $response->assertStatus(200);
    }
}
