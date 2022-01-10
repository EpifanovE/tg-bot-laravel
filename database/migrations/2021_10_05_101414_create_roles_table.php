<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateRolesTable extends Migration
{
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('key', 255);
            $table->string("name",255);
            $table->json("permissions")->nullable();
            $table->boolean("built_in")->default(false);
            $table->timestamps();
        });

        Schema::create('admin_role', function (Blueprint $table) {
            $table->bigInteger("admin_id")->unsigned();
            $table->bigInteger("role_id")->unsigned();

            $table->primary(["admin_id", "role_id"]);

            $table->foreign('admin_id')
                ->references('id')->on('admins')
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')->on('roles')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('admin_role');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
