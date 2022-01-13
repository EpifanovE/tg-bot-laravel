<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Analytics\PeriodRequest;
use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use App\Services\Chart\ChartData;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function newSubscribers(PeriodRequest $request)
    {
        $requestData = $request->validated();

        $chartData = new ChartData(LogEvent::subscribe());
        $chartData->setTable("log_events");

        if (!empty($requestData["from"]) && !empty($requestData["to"]) && !empty($requestData["step"])) {
            $chartData->period(Carbon::parse($requestData["from"]), Carbon::parse($requestData["to"]), $requestData["step"] ?? null);
        } elseif (!empty($requestData["key"])) {
            $methodName = $this->getPeriodMethodName($requestData["key"]);

            $chartData->$methodName();
        }

        $weekResult = $chartData->toArray();

        return response()->json($weekResult);
    }

    private function getPeriodMethodName(string $key): string
    {
        switch ($key) {
            case "week" :
                return "weekAgo";
            case "year" :
                return "yearAgo";
            case "current_week" :
                return "currentWeek";
            case "current_month" :
                return "currentMonth";
            case "current_year" :
                return "currentYear";
            default :
                return "monthAgo";
        }
    }
}
