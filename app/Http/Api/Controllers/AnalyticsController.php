<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\ResourceIndexRequest;
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

    public function newSubscribers(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $weekResult = $this->service->newSubscribersChart($request->validated());

        return response()->json($weekResult);
    }

    public function newSubscribersTable(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->newSubscribersTable($request->validated());

        return new StandardResourceCollection($data);
    }

    public function uniqueUsages(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->uniqueUsagesChart($request->validated());

        return response()->json($data);
    }

    public function commands(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commandsChart($request->validated());

        return response()->json($data);
    }

    public function commandsTable(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->commandsTable($request->validated());

        return new StandardResourceCollection($data);
    }

    public function unhandled(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->unhandledChart($request->validated());

        return response()->json($data);
    }

    public function unhandledTable(ResourceIndexRequest $request)
    {
        $this->authorize("view", LogEvent::class);

        $data = $this->service->unhandledTable($request->validated());

        return new StandardResourceCollection($data);
    }

}
