<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ChartData
{
    protected ?string $tableName = null;

    protected string $property = 'created_at';

    protected Builder $builder;

    protected PeriodBuilder $periodBuilder;

    public function __construct(Builder $builder, PeriodBuilder $periodBuilder)
    {
        $this->builder = $builder;
        $this->periodBuilder = $periodBuilder;
    }

    public function setTable(string $tableName)
    {
        $this->tableName = $tableName;
    }

    public function setProperty(string $property)
    {
        $this->property = $property;
    }

    public function toArray()
    {
        if (!empty($this->periodBuilder->getFrom())) {
            $this->builder->whereDate(DB::raw($this->getFullProperty()), '>=', $this->periodBuilder->getFrom());
        }

        if (!empty($this->getFullProperty())) {
            $this->builder->whereDate(DB::raw($this->getFullProperty()), '<=', $this->periodBuilder->getTo());
        }

        $collection = $this->builder
            ->get()
            ->pluck($this->property)
            ->map(function ($item) {
                /**
                 * @var \Illuminate\Support\Carbon $item
                 */
                return $item->format($this->periodBuilder->getDateFormat());
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
        if ($this->periodBuilder->getStep() === PeriodBuilder::STEP_DAY) {
            return $this->buildDatesArray();
        }

        if ($this->periodBuilder->getStep() === PeriodBuilder::STEP_MONTH) {
            return $this->buildMonthsArray();
        }
    }

    protected function buildDatesArray()
    {
        $start = $this->periodBuilder->getFrom()->toImmutable();
        $end  = $this->periodBuilder->getTo()->toImmutable();

        $array = [
            $this->periodBuilder->getFrom()->format($this->periodBuilder->getDateFormat()),
        ];

        for ($i = 1; $i < $start->diffInDays($end); $i++) {
            array_push($array, $start->addDays($i)->format($this->periodBuilder->getDateFormat()));
        }

        array_push($array, Carbon::parse($this->periodBuilder->getTo())->format($this->periodBuilder->getDateFormat()));

        return $array;
    }

    protected function buildMonthsArray()
    {

        $start = $this->periodBuilder->getFrom()->toImmutable();
        $end  = $this->periodBuilder->getTo()->toImmutable();

        $diff = $start->startOfMonth()->diffInMonths($end->startOfMonth());

        $array = [];

        for ($i = 0; $i <= $diff; $i++) {
            array_push($array, $start->addMonthsNoOverflow($i)->format($this->periodBuilder->getDateFormat()));
        }

        return $array;
    }

    protected function getFullProperty(): string
    {
        if (!empty($this->tableName)) {
            return $this->tableName . "." . $this->property;
        }

        return $this->property;
    }
}
