<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentablesTable extends Migration
{
    public function up()
    {
        Schema::create('attachmentables', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("attachment_id")->unsigned();
            $table->bigInteger("attachmentable_id")->unsigned();
            $table->string("attachmentable_type");

            $table->foreign("attachment_id")->references("id")->on("attachments")->onDelete("cascade");
        });
    }

    public function down()
    {
        Schema::dropIfExists('attachmentables');
    }
}
