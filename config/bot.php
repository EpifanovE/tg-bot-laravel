<?php

return [
    'token' => env('TELEGRAM_BOT_TOKEN'),
    'webhook' => env('TELEGRAM_BOT_WEBHOOK_URL', env('APP_URL').'/bot/'.env('TELEGRAM_BOT_TOKEN')),
    'handlers' => [
        \App\Bot\Commands\StartCommand::class,
        \App\Bot\KeyboardHandlers\ExampleButton::class,
    ],
];
