<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Admin\AdminCreateRequest;
use App\Http\Api\Requests\Admin\AdminUpdateRequest;
use App\Http\Api\Requests\DestroyManyRequest;
use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Resources\Admin\AdminResource;
use App\Http\Api\Resources\Admin\AdminResourceCollection;
use App\Models\Admin\Admin;
use App\UseCases\Admin\AdminService;

class AdminController extends Controller
{
    /**
     * @var AdminService
     */
    private $service;

    public function __construct(AdminService $service)
    {
        $this->service = $service;
    }

    public function index(ResourceIndexRequest $request)
    {
        $this->authorize('view', Admin::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Admin::query(), $data);

        return new AdminResourceCollection($query);
    }

    public function store(AdminCreateRequest $request)
    {
        $this->authorize('manage', Admin::class);

        $data = $request->validated();

        $admin = $this->service->create($data);

        return new AdminResource($admin);
    }

    public function show(Admin $admin)
    {
        $this->authorize('view', Admin::class);

        return new AdminResource($admin);
    }

    public function update(AdminUpdateRequest $request, Admin $admin)
    {
        $this->authorize('manage', Admin::class);

        $data = $request->validated();

        $admin = $this->service->update($admin, $data);

        return new AdminResource($admin);
    }

    public function destroy(Admin $admin)
    {
        $this->authorize('manage', Admin::class);

        $this->service->delete($admin);
    }

    public function destroyMany(DestroyManyRequest $request) {
        $this->authorize('manage', Admin::class);
        $this->service->deleteMany($request->validated()['ids']);
    }

    protected function filterQueryParams($query, $filter)
    {
        if (!empty($filter["status"])) {
            $query->status($filter["status"][0]);
        }

        if (!empty($filter["search"])) {
            $query->search($filter["search"]);
        }

        if (!empty($filter["has_subscriber"])) {
            $query->hasSubscriber();
        }

        return $query;
    }
}
