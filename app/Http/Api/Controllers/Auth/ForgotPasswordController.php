<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers\Auth;

use App\Http\Api\Controllers\Controller;
use App\Http\Api\Requests\Auth\ResetPasswordRequest;
use App\Http\Api\Requests\Auth\SetPasswordRequest;
use App\Models\Admin\Admin;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(ResetPasswordRequest $request)
    {
        $admin = Admin::where("email", $request->validated()["email"])->first();

        if (!empty($admin) && !$admin->isActive()) {
            throw new AuthenticationException(__('auth.failed'));
        }

        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($response)
            : $this->sendResetLinkFailedResponse($response);
    }

    public function reset(SetPasswordRequest $request)
    {
        $admin = Admin::where("email", $request->validated()["email"])->first();

        if (!empty($admin) && !$admin->isActive()) {
            throw new AuthenticationException(__('auth.failed'));
        }

        $response = $this->broker()->reset(
            $request->only(["email", "password", "password_confirmation", "token"]), function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($response)
            : $this->sendResetFailedResponse($response);
    }

    protected function sendResetLinkResponse($response)
    {
        return new JsonResponse(['message' => trans($response)], 200);
    }

    protected function sendResetLinkFailedResponse($response)
    {
        throw ValidationException::withMessages([
            'email' => [trans($response)],
        ]);
    }

    protected function sendResetResponse($response)
    {
        return new JsonResponse(['message' => trans($response)], 200);
    }

    protected function sendResetFailedResponse($response)
    {
        throw ValidationException::withMessages([
            'email' => [trans($response)],
        ]);
    }

    public function broker()
    {
        return Password::broker('admins');
    }

    protected function credentials(ResetPasswordRequest $request)
    {
        return $request->only('email');
    }

    protected function resetPassword(Admin $user, $password)
    {
        $this->setUserPassword($user, $password);

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));

        $this->guard()->login($user);
    }

    protected function setUserPassword($user, $password)
    {
        $user->password = Hash::make($password);
    }

    protected function guard()
    {
        return Auth::guard("web");
    }
}
