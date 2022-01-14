<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Admin\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class AnalyticsPolicy
{
    use HandlesAuthorization;

    public function view(Admin $admin)
    {
        if ($admin->hasPermission('analytics.manage')
            || $admin->hasPermission('analytics.view')
        ) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }

    public function manage(Admin $admin)
    {
        if ($admin->hasPermission('analytics.manage')) {
            return Response::allow();
        }

        return Response::deny(__('auth.no_permissions'), 403);
    }
}
