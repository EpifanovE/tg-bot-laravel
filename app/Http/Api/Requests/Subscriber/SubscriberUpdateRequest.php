<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Subscriber;

use Illuminate\Foundation\Http\FormRequest;

class SubscriberUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "blocked" => ["boolean", "nullable",],
            "admin_id" => ["integer", "nullable",],
        ];
    }
}
