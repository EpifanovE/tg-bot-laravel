<?php

namespace App\Http\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResourceIndexRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'page' => ['integer', 'nullable',],
            'perPage' => ['integer', 'nullable',],
            'filter' => ['json', 'nullable',],
            'sort' => ['json', 'nullable',],
            'export' => ['nullable', 'boolean',],
            "paginate" => ["nullable", "boolean",],
        ];
    }
}
