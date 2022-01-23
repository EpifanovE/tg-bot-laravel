<?php

namespace App\Listeners;

use App\Events\UsageEvent;
use App\Models\LogEvent\LogEvent;
use App\Models\Setting\Setting;
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
        $settings = Setting::where("code", "analytics")->first();

        if (!empty($settings->payload["events"]) && in_array($event->getCode(), $settings->payload["events"])) {
            LogEvent::create([
                "subscriber_id" => $event->getSubscriber()->id,
                "code" => $event->getCode(),
                "payload" => $event->getPayload(),
            ]);
        }
    }
}
