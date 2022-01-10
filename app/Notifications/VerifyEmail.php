<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Mail\Mailable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class VerifyEmail extends Notification
{
    use Queueable;

    private string $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(Lang::get("email.registration.subject"))
            ->line(Lang::get("email.registration.top"))
            ->line(Lang::get("email.registration.second"))
            ->action(Lang::get("email.registration.action"), url("/admin/verification/{$this->token}/{$notifiable->email}"))
            ->line(Lang::get("email.registration.bottom_line"));
    }
}
