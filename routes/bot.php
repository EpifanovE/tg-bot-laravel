<?php

use Illuminate\Support\Facades\Route;

Route::post("{token}", "BotController@bot")->middleware(["bot_subscriber"]);
