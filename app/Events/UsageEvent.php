<?php

namespace App\Events;

use App\Models\Subscriber\Subscriber;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UsageEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected Subscriber $subscriber;
    protected string $code;
    protected array $payload;

    public function __construct(Subscriber $subscriber, string $code, array $payload = [])
    {
        $this->subscriber = $subscriber;
        $this->code = $code;
        $this->payload = $payload;
    }

    public function getSubscriber(): Subscriber
    {
        return $this->subscriber;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function getPayload(): array
    {
        return $this->payload;
    }
}
