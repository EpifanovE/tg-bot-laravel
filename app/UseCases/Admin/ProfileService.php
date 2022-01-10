<?php

declare(strict_types=1);

namespace App\UseCases\Admin;

use App\Models\Admin\Admin;
use Illuminate\Support\Facades\Hash;

class ProfileService
{
    public function update(Admin $admin, array $data): Admin
    {
        if (!empty($data["password"])) {
            $data["password"] = Hash::make($data["password"]);
        }

        $admin->fill($data);
        $admin->save();
        $admin->refresh();

        return $admin;
    }

    private function uploadAvatar(array $data): string
    {

    }
}
