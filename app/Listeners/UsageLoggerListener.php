<?php

namespace App\Listeners;

use App\Events\UsageEvent;
use App\Models\LogEvent\LogEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UsageLoggerListener
{
    public function __construct()
    {
        //
    }

    public function handle(UsageEvent $event)
    {
        LogEvent::create([
            "subscriber_id" => $event->getSubscriber()->id,
            "code" => $event->getCode(),
            "payload" => $event->getPayload(),
        ]);
    }
}
