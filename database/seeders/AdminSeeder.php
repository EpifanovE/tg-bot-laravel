<?php

namespace Database\Seeders;

use App\Models\Admin\Admin;
use App\Models\Admin\Role;
use App\Models\Admin\Status;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run()
    {
        DB::table('admins')->insert(
            [
                [
                    'name' => 'Evgeny Epifanov',
                    'email' => 'workeev@gmail.com',
                    'status' => Status::ACTIVE,
                    'built_in' => true,
                    'email_verified_at' => now(),
                    'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                    'remember_token' => Str::random(10),
                    'settings' => '{}',
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
            ]
        );

        $permissions = array_map(function ($permissionData) {
            return $permissionData["code"];
        }, config("authorization.permissions"));

        DB::table("roles")->insert([
            [
                "key" => "admin",
                "name" => "Администратор",
                "permissions" => json_encode($permissions),
                "built_in" => true,
            ],
            [
                "key" => "manager",
                "name" => "Менеджер",
                "permissions" => json_encode([
                    "admins.manage",
                ]),
                "built_in" => false,
            ],
        ]);

        $admin = Admin::where("email", "workeev@gmail.com")->first();
        $role = Role::where("key", "admin")->first();

        DB::table("admin_role")->insert([
            [
                "admin_id" => $admin->id,
                "role_id" => $role->id,
            ],
        ]);
    }
}
