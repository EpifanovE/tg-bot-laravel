<?php

declare(strict_types=1);

namespace App\UseCases\Setting;

use App\Models\LogEvent\LogEvent;
use App\Models\Setting\Setting;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class AnalyticsSettingsService
{
    public function update(array $requestData): Setting
    {
        $setting = Setting::where("code", "analytics")->first();
        $setting->fill([
            "payload->events" => $requestData["events"] ?? [],
        ]);
        $setting->save();
        $setting->refresh();

        return $setting;
    }

    public function clean(array $requestData): int
    {
        /**
         * @var Builder $builder
         */
        $builder = LogEvent::query();

        if (!empty($requestData["date"])) {
            $date = Carbon::parse($requestData["date"])->endOfDay();

            $builder->whereDate("created_at", "<=", $date);
        }

        $count = $builder->count();

        $builder->delete();

        return $count;
    }

    public function getEvents(): array
    {
        return config("bot.events");
    }
}
