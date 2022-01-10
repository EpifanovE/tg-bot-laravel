<?php

namespace App\Http\Api\Controllers\Auth;

use App\Exceptions\DomainException;
use App\Exceptions\LoginException;
use App\Http\Api\Controllers\Controller;
use App\Http\Api\Requests\Auth\LoginRequest;
use App\Http\Api\Resources\Admin\AdminProfileResource;
use App\Models\Admin\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = !empty($request->validated()['remember_me']);

        if (!Auth::attempt($credentials, $remember)) {
            throw new LoginException(__('auth.failed'));
        }

        /**
         * @var Admin $admin
         */
        $admin = Auth::user();

        if ($admin->isPending()) {
            throw new DomainException(__('auth.login_failed_pending'));
        }

        if (!$admin->isActive()) {
            throw new DomainException(__('auth.blocked'));
        }

        return new AdminProfileResource($admin);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function csrfToken() {
        return csrf_token();
    }
}
