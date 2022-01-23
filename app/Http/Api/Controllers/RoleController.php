<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Admin\RoleRequest;
use App\Http\Api\Requests\DestroyManyRequest;
use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Resources\Admin\RoleResource;
use App\Http\Api\Resources\Admin\RoleResourceCollection;
use App\Models\Admin\Role;
use App\UseCases\Admin\RoleService;

class RoleController extends Controller
{
    private RoleService $service;

    public function __construct(RoleService $service)
    {
        $this->service = $service;
    }

    public function index(ResourceIndexRequest $request)
    {
        $this->authorize('view', Role::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Role::query(), $data);

        return new RoleResourceCollection($query);
    }

    public function store(RoleRequest $request)
    {
        $this->authorize('manage', Role::class);

        $data = $request->validated();

        $role = $this->service->create($data);

        return new RoleResource($role);
    }

    public function show(Role $role)
    {
        $this->authorize('view', Role::class);

        return new RoleResource($role);
    }

    public function update(RoleRequest $request, Role $role)
    {
        $this->authorize('manage', Role::class);

        $data = $request->validated();

        $role = $this->service->update($role, $data);

        return new RoleResource($role);
    }

    public function destroy(Role $role)
    {
        $this->authorize('manage', Role::class);

        $this->service->delete($role);
    }

    public function destroyMany(DestroyManyRequest $request) {
        $this->authorize('manage', Role::class);
        $this->service->deleteMany($request->validated()['ids']);
    }

    public function permissions()
    {
        return response()->json(config("authorization.permissions"));
    }
}
