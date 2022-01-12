<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogEventsTable extends Migration
{
    public function up()
    {
        Schema::create('log_events', function (Blueprint $table) {
            $table->id();
            $table->string("code", 128);
            $table->json("payload")->nullable();
            $table->bigInteger("subscriber_id")->unsigned();
            $table->timestamps();
            $table->dropColumn('updated_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('log_events');
    }
}
