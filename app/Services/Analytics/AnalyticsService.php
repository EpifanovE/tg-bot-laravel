<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use App\Models\LogEvent\LogEvent;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function newSubscribers(array $requestData): array
    {
        $builder = LogEvent::subscribe();

        if (!empty($requestData["payload"])) {
            $builder->withPayload($requestData["payload"]);
        }

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($requestData);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function newSubscribersTable(array $requestData): array
    {
        $orderBy = $requestData["sortBy"] ?? "count";
        $orderDirection = $requestData["sortDirection"] ?? "desc";

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($requestData);

        $builder = LogEvent::subscribe();

        if (!empty($requestData["payload"])) {
            $builder->withPayload($requestData["payload"]);
        }

        return $builder
            ->whereDate(DB::raw("log_events.created_at"), '>=', $periodBuilder->getFrom())
            ->whereDate(DB::raw("log_events.created_at"), '<=', $periodBuilder->getTo())
            ->selectRaw('count(*) as count, payload')
            ->groupBy("payload")
            ->orderBy($orderBy, $orderDirection)
            ->get()->toArray();
    }
}
