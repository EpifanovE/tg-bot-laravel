<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Lang;

class PasswordReset extends ResetPassword
{
    use Queueable;

    public function toMail($notifiable)
    {

        $url = url("/password/reset/{$this->token}/{$notifiable->getEmailForPasswordReset()}");

        return $this->buildMailMessage($url);
    }

    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject(Lang::get("email.reset.subject"))
            ->line(Lang::get("email.reset.top"))
            ->action(Lang::get("email.reset.action"), $url)
            ->line(Lang::get('email.reset.second_line', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
            ->line(Lang::get('email.reset.bottom_line'));
    }
}
