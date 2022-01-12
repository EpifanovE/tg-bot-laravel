<?php

namespace App\Providers;

use App\Events\UsageEvent;
use App\Listeners\UsageLoggerListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{

    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        UsageEvent::class => [
            UsageLoggerListener::class,
        ],
    ];

    public function boot()
    {
        //
    }
}
