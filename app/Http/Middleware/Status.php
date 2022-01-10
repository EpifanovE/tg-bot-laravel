<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\LoginException;
use App\Models\Admin\Admin;
use Closure;
use Illuminate\Support\Facades\Auth;

class Status
{
    public function handle($request, Closure $next)
    {
        /**
         * @var Admin $admin
         */
        $admin = $request->user();

        if (!$admin->isActive()) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw new LoginException(__("auth.blocked"));
        }

        return $next($request);
    }
}
