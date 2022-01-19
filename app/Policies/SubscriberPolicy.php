<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Admin\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SubscriberPolicy
{
    use HandlesAuthorization;

    public function view(Admin $admin)
    {
        if ($admin->hasPermission('subscribers.manage')
            || $admin->hasPermission('subscribers.view')
        ) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }

    public function manage(Admin $admin)
    {
        if ($admin->hasPermission('subscribers.manage')) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }
}
