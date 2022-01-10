<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string',],
            'email' => ['required', 'email',],
            'password' => ['nullable', 'confirmed', 'min:8'],
            'avatar' => ['nullable', 'image',],
        ];
    }
}
