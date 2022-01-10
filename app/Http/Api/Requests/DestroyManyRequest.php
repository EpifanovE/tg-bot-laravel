<?php

namespace App\Http\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DestroyManyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'ids' => ['array'],
            'ids.*' => ['integer',],
        ];
    }
}
