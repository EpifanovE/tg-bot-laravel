<?php

declare(strict_types=1);

namespace App\Services;

class Telegram
{
    public function send(string $message)
    {
        $token  = config("custom.telegram_token");
        $chatId = config("custom.telegram_chat_id");

        if (empty($token) || empty($chatId)) {
            return;
        }

        $url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chatId}&parse_mode=html&text={$message}";

        try {
            $remote = file_get_contents($url);
        } catch (\Exception $e) {
            throw new \Exception('Telegram is not available.');
        }
    }
}
