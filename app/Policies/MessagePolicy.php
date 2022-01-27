<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Admin\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MessagePolicy
{
    use HandlesAuthorization;

    public function view(Admin $admin)
    {
        if ($admin->hasPermission('messages.manage')
            || $admin->hasPermission('messages.view')
        ) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }

    public function manage(Admin $admin)
    {
        if ($admin->hasPermission('messages.manage')) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }
}
