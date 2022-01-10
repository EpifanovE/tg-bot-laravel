<?php

namespace App\Policies;

use App\Models\Admin\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class AdminPolicy
{
    use HandlesAuthorization;

    public function view(Admin $admin)
    {
        if ($admin->hasPermission('admins.manage') || $admin->hasPermission('admins.view')
        ) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }

    public function manage(Admin $admin)
    {
        if ($admin->hasPermission('roles.manage')) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }
}
