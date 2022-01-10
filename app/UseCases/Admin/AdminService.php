<?php

namespace App\UseCases\Admin;

use App\Models\Admin\Admin;
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

    protected function setRoles(Admin $admin, $roles_ids)
    {
        $admin->roles()->sync($roles_ids);
    }
}
