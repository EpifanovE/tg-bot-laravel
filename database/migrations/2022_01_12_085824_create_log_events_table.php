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
            $table->string("payload", 1024)->nullable();
            $table->bigInteger("subscriber_id")->unsigned()->nullable();
            $table->timestamp('created_at')->nullable();

            $table->foreign('subscriber_id')
                ->references('id')->on('subscribers')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('log_events');
    }
}
