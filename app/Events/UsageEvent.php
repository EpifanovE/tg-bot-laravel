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
    protected ?string $payload = null;

    public function __construct(Subscriber $subscriber, string $code, ?string $payload = null)
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

    public function getPayload(): ?string
    {
        return $this->payload;
    }
}
