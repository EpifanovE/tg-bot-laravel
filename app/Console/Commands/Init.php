<?php

namespace App\Console\Commands;

use App\UseCases\Admin\AdminService;
use App\UseCases\Admin\RoleService;
use Illuminate\Console\Command;

class Init extends Command
{
    protected $signature = 'bot:init {email} {name} {password?}';

    protected $description = 'Bot initialization';

    private AdminService $adminService;

    private RoleService $roleService;

    public function __construct(AdminService $adminService, RoleService $roleService)
    {
        parent::__construct();
        $this->adminService = $adminService;
        $this->roleService = $roleService;
    }

    public function handle()
    {
        $adminRole = $this->roleService->create([
            "name" => "Администратор",
            "key" => "admin",
            "built_in" => true,
            "permissions" => [
                "admins.manage",
                "admins.view",
                "roles.manage",
                "roles.view",
                "subscribers.view",
                "subscribers.manage",
                "settings.view",
                "settings.manage",
            ],
        ]);

        $admin = $this->adminService->create([
            "name" => $this->argument("name"),
            "email" => $this->argument("email"),
            "password" => !empty($this->argument("password")) ? $this->argument("password") : "12345678",
        ]);

        $admin->roles()->attach($adminRole);
    }
}
