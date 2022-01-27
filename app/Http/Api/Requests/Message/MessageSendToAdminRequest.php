<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class MessageSendToAdminRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "id" => ["required", "integer", ],
        ];
    }
}
