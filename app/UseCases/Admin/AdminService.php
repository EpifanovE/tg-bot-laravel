<?php

namespace App\UseCases\Admin;

use App\Exceptions\DomainException;
use App\Models\Admin\Admin;
use App\Models\Admin\Role;
use App\Models\Admin\Status;
use Illuminate\Support\Facades\Hash;

class AdminService
{
    public function create($data): Admin
    {

        $data['password'] = Hash::make($data['password']);

        $data["status"] = !empty($data["status"]) ? $data["status"] : Status::ACTIVE;

        $admin = Admin::create($data);
        if (isset($data["roles"])) {
            $this->setRoles($admin, $data["roles"]);
        }

        $admin->markEmailAsVerified();

        return $admin;
    }

    public function update(Admin $admin, $data): Admin
    {
        if ($admin->built_in) {
            unset($data["roles"]);
            unset($data["status"]);
        }

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data["password"]);
        }

        if (isset($data["roles"])) {
            $this->setRoles($admin, $data["roles"]);
        }

        $admin->fill($data);

        $admin->save();

        return $admin;
    }

    public function delete(Admin $admin) {
        if ($admin->built_in) {
            throw new DomainException(trans("notifications.cant_deleted"));
        }

        $admin->delete();
    }

    public function deleteMany(array $ids)
    {
        $collection = Admin::findMany($ids)->filter(function (Admin $admin) {
            return !$admin->built_in;
        });

        if ($collection->count() > 0) {
            $collection->toQuery()->delete();
        }
    }

    protected function setRoles(Admin $admin, $roles_ids)
    {
        if ($admin->built_in) {
            return;
        }

        $admin->roles()->sync($roles_ids);
    }
}
