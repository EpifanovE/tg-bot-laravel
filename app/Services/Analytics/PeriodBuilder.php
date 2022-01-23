<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use Carbon\Carbon;

class PeriodBuilder
{
    const STEP_DAY = 'day';

    const STEP_MONTH = 'month';

    protected string $dateFormat = 'd-m-Y';

    protected Carbon $from;

    protected Carbon $to;

    protected string $step = self::STEP_DAY;

    public function byRequest(array $data)
    {
        if ($data["key"] === "customPeriod") {
            if (!empty($data["from"])) {
                $this->from = Carbon::parse($data["from"]);
            } else {
                $this->from = (new Carbon())->subMonth()->startOfMonth();
            }

            if (!empty($data["to"])) {
                $this->to = Carbon::parse($data["to"]);
            } else {
                $this->to = Carbon::now();
            }

            if (!empty($data["step"])) {
                $this->step = $data["step"];
            }

            $this->from->startOfDay();
            $this->to->endOfDay();

        } else {

            $methodName = $this->getPeriodMethodName($data["key"]);

            $this->$methodName();

            if (in_array($methodName, ["yearAgo", "currentMonth", "currentYear", ])) {
                $this->from->startOfMonth();
            }

            if (in_array($methodName, ["weekAgo", "currentWeek", "monthAgo", ])) {
                $this->from->startOfDay();
            }
        }


        if ($this->step === self::STEP_MONTH) {
            $this->dateFormat = "m-Y";
        }
    }

    public function period(Carbon $from, Carbon $to, $step = self::STEP_DAY)
    {
        $this->from   = $from;
        $this->to     = $to;
        $this->step = $step;

        if ($step === self::STEP_MONTH) {
            $this->dateFormat = "m-Y";
        }
    }

    public function weekAgo()
    {
        $this->from = (new Carbon())->subDays(6);
        $this->to   = (new Carbon());
    }

    public function monthAgo()
    {
        $this->from = (new Carbon())->subMonth();
        $this->to   = (new Carbon())->now();
    }

    public function currentMonth()
    {
        $this->from = (new Carbon())->startOfMonth();
        $this->to   = (new Carbon())->now();
    }

    public function yearAgo()
    {
        $this->from = (new Carbon())->subYear();
        $this->to   = (new Carbon())->now();

        $this->step = self::STEP_MONTH;
        $this->dateFormat = 'm-Y';
    }

    public function currentYear()
    {
        $this->from = (new Carbon())->startOfYear();
        $this->to   = (new Carbon())->now();

        $this->step = self::STEP_MONTH;
        $this->dateFormat = 'm';
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

    public function getFrom(): Carbon
    {
        return $this->from;
    }

    public function getTo(): Carbon
    {
        return $this->to;
    }

    public function getDateFormat(): string
    {
        return $this->dateFormat;
    }

    public function getStep(): string
    {
        return $this->step;
    }
}
