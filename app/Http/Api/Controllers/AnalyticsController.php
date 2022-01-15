<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Analytics\PeriodRequest;
use App\Models\LogEvent\LogEvent;
use App\Services\Analytics\AnalyticsService;

class AnalyticsController extends Controller
{
    private AnalyticsService $service;

    public function __construct(AnalyticsService $service)
    {
        $this->service = $service;
    }

    public function newSubscribers(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $weekResult = $this->service->newSubscribers($request->validated());

        return response()->json($weekResult);
    }

    public function newSubscribersTable(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->newSubscribersTable($request->validated());

        return response()->json($data);
    }

    public function uniqueUsages(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->uniqueUsages($request->validated());

        return response()->json($data);
    }

    public function commands(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commands($request->validated());

        return response()->json($data);
    }

    public function commandsTable(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commandsTable($request->validated());

        return response()->json($data);
    }

    public function test(PeriodRequest $request)
    {

    }

}
