<?php

namespace App\Http\Api\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AdminCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string',],
            'email' => ['required', 'email', 'unique:admins,email'],
            'password' => ['required', 'confirmed', 'min:8',],
            'status' => ["required", "string",],
            'roles' => ['array', 'nullable'],
            'roles.*' => ['integer',],
        ];
    }
}
