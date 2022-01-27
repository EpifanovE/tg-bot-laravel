<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use WeStacks\TeleBot\Exception\TeleBotRequestException;
use WeStacks\TeleBot\TeleBot;

class TelegramBulkSend implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private array $messageData;
    private array $subscribersIds;

    public function __construct(array $messageData, array $subscribersIds)
    {
        $this->messageData = $messageData;
        $this->subscribersIds = $subscribersIds;
    }


    public function handle(TeleBot $bot)
    {
        foreach ($this->subscribersIds as $subscriber) {
            try {
                $response = $bot->sendMessage([
                    'chat_id' => $subscriber,
                    'text' => $this->messageData["body"],
                ]);
            } catch (TeleBotRequestException $e) {

            }

            usleep(100000);
        }
    }
}
