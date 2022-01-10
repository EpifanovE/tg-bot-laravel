<?php

namespace App\Http\Api\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AdminUpdateRequest extends FormRequest
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
            'status' => ["required", "string",],
            'roles' => ['array', 'required'],
            'roles.*' => ['integer',],
        ];
    }
}
