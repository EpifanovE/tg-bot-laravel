<?php

namespace App\Providers;

use App\Models\Admin\Admin;
use App\Models\Admin\Role;
use App\Models\LogEvent\LogEvent;
use App\Models\Setting\Setting;
use App\Models\Subscriber\Subscriber;
use App\Policies\AdminPolicy;
use App\Policies\AnalyticsPolicy;
use App\Policies\RolePolicy;
use App\Policies\SettingPolicy;
use App\Policies\SubscriberPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        Admin::class => AdminPolicy::class,
        Role::class => RolePolicy::class,
        Setting::class => SettingPolicy::class,
        LogEvent::class => AnalyticsPolicy::class,
        Subscriber::class => SubscriberPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
