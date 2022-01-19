<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscribersTable extends Migration
{
    public function up()
    {
        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("tid")->unsigned();
            $table->string("first_name", 1024)->nullable();
            $table->string("last_name", 1024)->nullable();
            $table->string("username", 1024)->nullable();
            $table->string("language_code", 16)->nullable();
            $table->boolean("blocked")->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subscribers');
    }
}
