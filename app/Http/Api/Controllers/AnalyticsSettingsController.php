<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Analytics\AnalyticsSettingsCleanRequest;
use App\Http\Api\Requests\Analytics\AnalyticsSettingsUpdateRequest;
use App\Http\Api\Resources\Setting\AnalyticsSettingsResource;
use App\Models\Setting\Setting;
use App\UseCases\Setting\AnalyticsSettingsService;

class AnalyticsSettingsController extends Controller
{
    private AnalyticsSettingsService $service;

    public function __construct(AnalyticsSettingsService $service)
    {
        $this->service = $service;
    }

    public function view()
    {
        $this->authorize("view", Setting::class);

        $setting = Setting::where("code", "analytics")->first();

        return new AnalyticsSettingsResource($setting);
    }

    public function update(AnalyticsSettingsUpdateRequest $request)
    {
        $this->authorize("manage", Setting::class);

        $setting = $this->service->update($request->validated());

        return new AnalyticsSettingsResource($setting);
    }

    public function clean(AnalyticsSettingsCleanRequest $request)
    {
        $this->authorize("manage", Setting::class);

        $data = $this->service->clean($request->validated());

        return response()->json($data);
    }

    public function events()
    {
        $this->authorize("manage", Setting::class);

        return response()->json($this->service->getEvents());
    }
}
