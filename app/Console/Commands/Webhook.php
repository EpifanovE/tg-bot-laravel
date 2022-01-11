<?php

declare(strict_types=1);


namespace App\Console\Commands;


use Illuminate\Console\Command;
use WeStacks\TeleBot\TeleBot;

class Webhook extends Command
{
    protected $signature = 'bot:webhook';

    protected $description = 'Set Webhook';

    private TeleBot $bot;

    public function __construct(TeleBot $bot)
    {
        parent::__construct();
        $this->bot = $bot;
    }

    public function handle()
    {
        $this->bot->setWebhook([
            "url" => config("bot.webhook")
        ]);
    }
}
