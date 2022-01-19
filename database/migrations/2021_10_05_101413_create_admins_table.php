<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAdminsTable extends Migration
{
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('status', 16);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->json('settings')->nullable();
            $table->boolean("built_in")->default(false);
            $table->bigInteger("subscriber_id")->unsigned()->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign("subscriber_id")->references("id")
                ->on("subscribers")->onDelete("set null");
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
