<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use WeStacks\TeleBot\TeleBot;

class SetCommands extends Command
{
    protected $signature = 'bot:commands';

    protected $description = 'Set commands';

    private TeleBot $bot;

    public function __construct(TeleBot $bot)
    {
        parent::__construct();
        $this->bot = $bot;
    }

    public function handle()
    {
        $this->bot->setMyCommands([
            'commands' => $this->bot->getLocalCommands()
        ]);
    }
}
