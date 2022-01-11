<?php

declare(strict_types=1);

namespace App\Bot\Screens;

use WeStacks\TeleBot\Interfaces\UpdateHandler;
use WeStacks\TeleBot\Objects\Keyboard\InlineKeyboardMarkup;
use WeStacks\TeleBot\Objects\KeyboardButton;

class Home
{
    public function send(UpdateHandler $handler)
    {
        $handler->sendMessage([
            "text" => "Текст главного экрана.",
            'reply_markup' => InlineKeyboardMarkup::create([
                "keyboard" => [
                    [
                        KeyboardButton::create([
                            "text" => trans("bot.buttons.taxes"),
                        ]),
                    ]
                ],
                "resize_keyboard" => true,
            ]),
        ]);
    }
}
