<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\DestroyManyRequest;
use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Requests\Setting\SettingRequest;
use App\Http\Api\Resources\Setting\SettingResource;
use App\Http\Api\Resources\Setting\SettingResourceCollection;
use App\Models\Setting\Setting;
use App\UseCases\Setting\SettingService;

class SettingController extends Controller
{
    private SettingService $service;

    public function __construct(SettingService $service)
    {
        $this->service = $service;
    }

    public function index(ResourceIndexRequest $request)
    {
        $this->authorize('view', Setting::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Setting::query(), $data);

        return new SettingResourceCollection($query);
    }

    public function store(SettingRequest $request)
    {
        $this->authorize('manage', Setting::class);

        $data = $request->validated();

        $setting = $this->service->create($data);

        return new SettingResource($setting);
    }

    public function show(Setting $setting)
    {
        $this->authorize('view', Setting::class);

        return new SettingResource($setting);
    }

    public function update(SettingRequest $request, Setting $setting)
    {
        $this->authorize('manage', Setting::class);

        $data = $request->validated();

        $setting = $this->service->update($setting, $data);

        return new SettingResource($setting);
    }

    public function destroy(Setting $setting)
    {
        $this->authorize('manage', Setting::class);

        $this->service->delete($setting);
    }

    public function destroyMany(DestroyManyRequest $request) {
        $this->authorize('manage', Setting::class);
        $this->service->deleteMany($request->validated()['ids']);
    }
}
