<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use App\Models\LogEvent\LogEvent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;

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

    public function uniqueUsages(array $requestData): array
    {

        $builder = LogEvent::query()
            ->select("subscriber_id", DB::raw("DATE(created_at) as created_at"))
            ->where("code", "!=", LogEvent::COMMAND_START)
            ->groupBy("subscriber_id", DB::raw("DATE(created_at)"));

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($requestData);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function commands(array $requestData): array
    {
        $builder = LogEvent::query()
            ->where("code", "!=", LogEvent::COMMAND_UNHANDLED);

        if (!empty($requestData["code"])) {
            $builder->withCode($requestData["code"]);
        }

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($requestData);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function commandsTable(array $requestData): array
    {
        $orderBy = $requestData["sortBy"] ?? "count";
        $orderDirection = $requestData["sortDirection"] ?? "desc";

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($requestData);

        $builder = LogEvent::query();

        if (!empty($requestData["code"])) {
            $builder->withCode($requestData["code"]);
        }

        return $builder
            ->whereDate(DB::raw("log_events.created_at"), '>=', $periodBuilder->getFrom())
            ->whereDate(DB::raw("log_events.created_at"), '<=', $periodBuilder->getTo())
            ->selectRaw('count(*) as count, code')
            ->groupBy("code")
            ->orderBy($orderBy, $orderDirection)
            ->get()
            ->map(function ($row) {
                if (Lang::has("bot.events.{$row->code}")) {
                    $row->label = Lang::get("bot.events.{$row->code}");
                }
                return $row;
            })->toArray();
    }
}
