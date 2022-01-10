<?php

namespace App\Providers;

use App\Models\Admin\Admin;
use App\Models\Admin\Role;
use App\Models\Setting\Setting;
use App\Policies\AdminPolicy;
use App\Policies\RolePolicy;
use App\Policies\SettingPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        Admin::class => AdminPolicy::class,
        Role::class => RolePolicy::class,
        Setting::class => SettingPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
