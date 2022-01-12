<?php

declare(strict_types=1);

namespace App\Services\Chart;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class ChartData
{
    const STEP_DAY = 'day';
    const STEP_MONTH = 'month';

    protected string $dateFormat = 'd-m-Y';

    protected string $property = 'created_at';

    protected Builder $builder;

    protected Carbon $from;

    protected Carbon $to;

    protected string $step = self::STEP_DAY;

    public function __construct($builder)
    {
        $this->builder = $builder;
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

    public function toArray()
    {
        $collection = $this->builder
            ->whereDate($this->property, '>=', $this->from)
            ->whereDate($this->property, '<=', $this->to)
            ->get()
            ->pluck($this->property)
            ->map(function ($item) {
                /**
                 * @var \Illuminate\Support\Carbon $item
                 */
                return $item->format($this->dateFormat);
            })
            ->countBy()
            ->sortBy(function ($item, $key) {
                return strtotime((string)$key);
            });

        $values = collect([]);
        $labels = collect([]);

        $valuesArray = $collection->toArray();

        foreach ($this->getDatesArray() as $date) {
            if (isset($valuesArray[$date])) {
                $values->push($valuesArray[$date]);
            } else {
                $values->push(0);
            }
            $labels->push($date);
        }

        return [
            'data'   => $values,
            'labels' => $labels,
        ];
    }

    protected function getDatesArray() {
        if ($this->step === self::STEP_DAY) {
            return $this->buildDatesArray();
        }

        if ($this->step === self::STEP_MONTH) {
            return $this->buildMonthsArray();
        }
    }

    protected function buildDatesArray()
    {
        $start = $this->from->toImmutable();
        $end  = $this->to->toImmutable();

        $array = [
            $this->from->format($this->dateFormat),
        ];

        for ($i = 1; $i < $start->diffInDays($end); $i++) {
            array_push($array, $start->addDays($i)->format($this->dateFormat));
        }

        array_push($array, Carbon::parse($this->to)->format($this->dateFormat));

        return $array;
    }

    protected function buildMonthsArray()
    {

        $start = $this->from->toImmutable();
        $end  = $this->to->toImmutable();

        $array = [$start->format($this->dateFormat)];

        for ($i = 1; $i <= $start->diffInMonths($end); $i++) {
            array_push($array, $start->addMonths($i)->format($this->dateFormat));
        }

        return $array;
    }
}
