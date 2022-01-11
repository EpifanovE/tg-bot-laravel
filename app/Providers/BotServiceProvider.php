<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use WeStacks\TeleBot\TeleBot;

class BotServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton(TeleBot::class, function ($app) {
            return new TeleBot([
                'token' => config("bot.token"),
                'api_url' => 'https://api.telegram.org',
                'exceptions' => true,
                'async' => false,
                'handlers' => config("bot.handlers")
            ]);
        });
    }

    public function boot()
    {

    }
}
