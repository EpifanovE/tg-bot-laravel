<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use App\Models\LogEvent\LogEvent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;

class AnalyticsService
{
    public function newSubscribersChart(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $builder = LogEvent::subscribe();

        if (!empty($filter["payload"])) {
            $builder->withPayload($filter["payload"]);
        }

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function newSubscribersTable(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $sort = !empty($requestData["sort"]) ? json_decode($requestData["sort"], true) : [];

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $builder = LogEvent::subscribe();

        if (!empty($filter["payload"])) {
            $builder->withPayload($filter["payload"]);
        }

        return $builder
            ->whereDate(DB::raw("log_events.created_at"), '>=', $periodBuilder->getFrom())
            ->whereDate(DB::raw("log_events.created_at"), '<=', $periodBuilder->getTo())
            ->selectRaw('count(*) as count, payload')
            ->groupBy("payload")
            ->orderBy(
                $sort["field"] ?? "count",
                $sort["order"] ?? "desc"
            )
            ->get()->toArray();
    }

    public function uniqueUsagesChart(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $builder = LogEvent::query()
            ->select("subscriber_id", DB::raw("DATE(created_at) as created_at"))
//            ->where("code", "!=", LogEvent::COMMAND_START)
            ->groupBy("subscriber_id", DB::raw("DATE(created_at)"));

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function commandsChart(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $builder = LogEvent::query()
            ->where("code", "!=", LogEvent::COMMAND_UNHANDLED);

        if (!empty($filter["code"])) {
            $builder->withCode($filter["code"]);
        }

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function commandsTable(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $sort = !empty($requestData["sort"]) ? json_decode($requestData["sort"], true) : [];

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $builder = LogEvent::query();

        if (!empty($filter["code"])) {
            $builder->withCode($filter["code"]);
        }

        return $builder
            ->whereDate(DB::raw("log_events.created_at"), '>=', $periodBuilder->getFrom())
            ->whereDate(DB::raw("log_events.created_at"), '<=', $periodBuilder->getTo())
            ->selectRaw('count(*) as count, code')
            ->groupBy("code")
            ->orderBy(
                $sort["field"] ?? "count",
                $sort["order"] ?? "desc"
            )
            ->get()
            ->map(function ($row) {
                if (Lang::has("bot.events.{$row->code}")) {
                    $row->label = Lang::get("bot.events.{$row->code}");
                }
                return $row;
            })->toArray();
    }

    public function unhandledChart(array $requestData): array
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $builder = LogEvent::unhandled();

        if (!empty($filter["payload"])) {
            $builder->withPayload($filter["payload"]);
        }

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        $chartData = new ChartData($builder, $periodBuilder);

        $chartData->setTable("log_events");

        return $chartData->toArray();
    }

    public function unhandledTable(array $requestData)
    {
        $filter = json_decode($requestData['filter'] ?? '{}', true);

        $sort = !empty($requestData["sort"]) ? json_decode($requestData["sort"], true) : [];

        $periodBuilder = new PeriodBuilder();
        $periodBuilder->byRequest($filter["period"] ?? ["key" => "month",]);

        /**
         * @var Builder $builder
         */
        $builder = LogEvent::unhandled();

        if (!empty($filter["payload"])) {
            $builder->withPayload($filter["payload"]);
        }

        return $builder
            ->whereDate(DB::raw("log_events.created_at"), '>=', $periodBuilder->getFrom())
            ->whereDate(DB::raw("log_events.created_at"), '<=', $periodBuilder->getTo())
            ->selectRaw('count(*) as count, payload, (@i:= @i+1) as id')
            ->groupBy("payload")
            ->orderBy(
                $sort["field"] ?? "count",
                $sort["order"] ?? "desc"
            )
            ->paginate($requestData['perPage'] ?? 25);
    }
}
