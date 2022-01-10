<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SetPasswordRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => ['required', 'email',],
            'password' => ['required', 'confirmed', 'min:8',],
            'token' => ['required',],
        ];
    }
}
