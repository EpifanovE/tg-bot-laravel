<?php

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\Admin\ProfileRequest;
use App\Http\Api\Resources\Admin\AdminProfileResource;
use App\Models\Admin\Admin;
use App\UseCases\Admin\AdminService;
use App\UseCases\Admin\ProfileService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $admin = $request->user();

        return new AdminProfileResource($admin);
    }

    public function update(ProfileRequest $request)
    {
        /**
         * @var Admin $admin
         */
        $admin   = $request->user();
        $service = new ProfileService();

        $data = $request->validated();

        $admin = $service->update($admin, $data);

        return new AdminProfileResource($admin);
    }
}
