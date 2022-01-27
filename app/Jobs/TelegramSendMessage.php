<?php

namespace App\Jobs;

use App\Models\Message\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use WeStacks\TeleBot\Exception\TeleBotRequestException;
use WeStacks\TeleBot\TeleBot;

class TelegramSendMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Message $message;
    private int $subscriberId;

    public function __construct(Message $message, int $subscriberId)
    {
        $this->message = $message;
        $this->subscriberId = $subscriberId;
    }

    public function handle(TeleBot $bot)
    {
        try {
            $bot->sendMessage([
                'chat_id' => $this->subscriberId,
                'text' => $this->message->body,
                "parse_mode" => $this->message->parse_mode === "md" ? "MarkdownV2" : "HTML",
            ]);
        } catch (TeleBotRequestException $e) {

        }

        usleep(50000);
    }
}
