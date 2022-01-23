<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Subscriber\Subscriber;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscriberMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $data = $request->all();
        $subscriber = null;

        $key = $this->getUpdateKey($data);

        if (empty($key)) {
            return;
        }

        if ($this->checkForSubscriber($data, $key)) {
            $id = $data[$key]["from"]["id"];

            $optional = [
                "first_name" => $data[$key]["from"]["first_name"] ?? "",
                "last_name" => $data[$key]["from"]["last_name"] ?? "",
                "username" => $data[$key]["from"]["username"] ?? "",
                "language_code" => $data[$key]["from"]["language_code"] ?? "",
            ];

            $subscriber = Subscriber::firstOrCreate(
                ["tid" => $id],
                $optional);

            $subscriber->fill($optional);
            $subscriber->save();
            $subscriber->refresh();
        }

        $request->attributes->add(["subscriber" => $subscriber]);

        Log::notice(print_r($subscriber->blocked, true));
        if ($subscriber->blocked) {
            return "";
        } else {
            return $next($request);
        }

    }

    protected function getUpdateKey(array $data): ?string
    {
        if (isset($data["message"])) {
            return "message";
        }

        if (isset($data["callback_query"])) {
            return "callback_query";
        }

        return null;
    }

    protected function checkForSubscriber(array $data, string $updateKey): bool
    {
        if (!empty($data[$updateKey]["from"]["is_bot"])) {
            return false;
        }

        if (!empty(!empty($data[$updateKey]["from"]["id"]))) {
            return true;
        }

        return false;
    }
}
