<?php

declare(strict_types=1);

namespace App\Bot\Commands;

use App\Bot\Screens\Home;
use App\Events\UsageEvent;
use App\Models\LogEvent\LogEvent;

class StartCommand extends \WeStacks\TeleBot\Handlers\CommandHandler
{
    protected static $aliases = ['/start', '/s'];

    protected static $description = 'Send "/start" or "/s" to get "Hello, World!"';

    public function handle()
    {
        $subscriber = request()->attributes->get("subscriber");

        event(new UsageEvent($subscriber, LogEvent::COMMAND_START));

        $this->sendMessage([
            "text" => "Здравствуйте!\n\nПриветственное сообщение Laravel."
        ]);

        $screen = new Home();
        $screen->send($this);
    }
}
