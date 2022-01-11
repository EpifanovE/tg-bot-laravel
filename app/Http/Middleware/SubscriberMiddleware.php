<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Subscriber\Subscriber;
use Closure;
use Illuminate\Http\Request;

class SubscriberMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request);


        $data = $request->all();
        $subscriber = null;

        $key = $this->getUpdateKey($data);

        if (empty($key)) {
            return;
        }

        if ($this->checkForSubscriber($data, $key)) {
            $id = $data[$key]["from"]["id"];

            $subscriber = Subscriber::firstOrCreate(
                ["id" => $id],
                []);

//            event(new UsageEvent($subscriber));
        }

        $request->attributes->add(["subscriber" => $subscriber]);

        return $next($request);
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
