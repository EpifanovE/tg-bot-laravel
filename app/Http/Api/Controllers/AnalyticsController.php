<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Analytics\PeriodRequest;
use App\Http\Api\Resources\StandardResourceCollection;
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

        $weekResult = $this->service->newSubscribersChart($request->validated());

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

        $data = $this->service->uniqueUsagesChart($request->validated());

        return response()->json($data);
    }

    public function commands(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commandsChart($request->validated());

        return response()->json($data);
    }

    public function commandsTable(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commandsTable($request->validated());

        return response()->json($data);
    }

    public function unhandled(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->unhandledChart($request->validated());

        return response()->json($data);
    }

    public function unhandledTable(PeriodRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->unhandledTable($request->validated());

        return new StandardResourceCollection($data);
    }

}
