<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (ThrottleRequestsException $e, $request) {
            return response()->json(["message" => __("notifications.too_many_attempts")], 429);
        });

        $this->renderable(function (LoginException $e, $request) {
            return response()->json(["message" => $e->getMessage()], 401);
        });

        $this->renderable(function (AccessException $e, $request) {
            return response()->json(["message" => $e->getMessage()], 403);
        });

        $this->renderable(function (DomainException $e, $request) {
            return response()->json(["message" => $e->getMessage()], 400);
        });
    }
}
