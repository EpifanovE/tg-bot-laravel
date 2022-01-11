<?php

declare(strict_types=1);

namespace App\Bot\TextHandlers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use WeStacks\TeleBot\Interfaces\UpdateHandler;
use WeStacks\TeleBot\Objects\Update;
use WeStacks\TeleBot\TeleBot;

class TextHandler extends UpdateHandler
{
    public static function trigger(Update $update, TeleBot $bot)
    {
        if (!empty($update->callback_query)) {
            return false;
        }

        if (!empty($update->callback_query->data)) {
            return false;
        }

        if (in_array($update->message->text, trans("bot.buttons"))) {
            return false;
        }

        if (in_array($update->message->text, [
            "/start",
            "/s"
        ])) {
            return false;
        }

        return !empty($update->message->text);
    }

    public function handle()
    {
        $request = app()->get(Request::class);
        /**
         * @var Subscriber $subscriber
         */
//        $subscriber = $request->get("subscriber");
    }
}
