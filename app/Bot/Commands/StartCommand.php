<?php

declare(strict_types=1);

namespace App\Bot\Commands;

use App\Bot\Screens\Home;
use App\Models\LogEvent\LogEvent;
use App\Models\Setting\Setting;
use App\Models\Subscriber\Subscriber;

class StartCommand extends \WeStacks\TeleBot\Handlers\CommandHandler
{
    protected static $aliases = ['/start', '/s'];

    protected static $description = 'Send "/start" or "/s" to get "Hello, World!"';

    public function handle()
    {
        $settings = Setting::where("code", "analytics")->first();

        if (!empty($settings->payload["events"]) && in_array(LogEvent::COMMAND_START, $settings->payload["events"])) {
            $this->subscriberHandle();
        }

        $this->sendMessage([
            "text" => "Здравствуйте!\n\nПриветственное сообщение Laravel."
        ]);

        $screen = new Home();
        $screen->send($this);
    }

    protected function subscriberHandle(): Subscriber
    {
        $text = $this->update->message->text;

        $param = null;

        if (strlen($text) > 7) {
            $param = substr($text, 7, strlen($text));
        }

        /**
         * @var Subscriber $subscriber
         */
        $subscriber = request()->attributes->get("subscriber");

        $logEventParams = [
            "code" => LogEvent::COMMAND_START,
            "payload" => $param,
        ];

        if ($subscriber->logEvents()->where("code", LogEvent::COMMAND_START)->count() === 0) {
            $logEventParams["created_at"] = $subscriber->created_at;
        }

        $subscriber->logEvents()->create($logEventParams);

        return $subscriber;
    }

}
