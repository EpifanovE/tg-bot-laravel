<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "key" => ["required", "string", ],
            "name" => ["required", "string", ],
            "permissions" => ["array", "nullable"],
            "permissions.*" => ["string", Rule::in(array_map(function ($permission) {
                return $permission["code"];
            }, config("authorization.permissions")))],
        ];
    }
}
