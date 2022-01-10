<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $setting = $this->route("setting");

        return [
            "code" => ["required", "string", "unique:settings,code" . (!empty($setting) ? "," . $setting->id : ""), ],
            "name" => ["required", "string", ],
            "type" => ["required", "string", ],
            "payload" => ["array",],
        ];
    }
}
