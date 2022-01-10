<?php

declare(strict_types=1);

namespace App\UseCases\Admin;

use App\Exceptions\DomainException;
use App\Models\Admin\Role;
use Illuminate\Support\Facades\Lang;

class RoleService
{
    public function create(array $data)
    {
        $role = Role::create($data);
        return $role;
    }

    public function update(Role $role, array $data)
    {
        if ($role->built_in) {
            throw new DomainException(Lang::get("notifications.cant_updated"));
        }

        $role->fill($data);
        $role->save();
        $role->refresh();

        return $role;
    }

    public function delete(Role $role)
    {
        if ($role->built_in) {
            throw new DomainException(Lang::get("notifications.cant_deleted"));
        }

        $role->delete();
    }

    public function deleteMany(array $ids)
    {
        $collection = Role::findMany($ids)->filter(function (Role $role) {
            return !$role->built_in;
        });

        if ($collection->count() > 0) {
            $collection->toQuery()->delete();
        }
    }
}
