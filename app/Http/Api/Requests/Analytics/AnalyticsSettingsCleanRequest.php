<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Analytics;

use Illuminate\Foundation\Http\FormRequest;

class AnalyticsSettingsCleanRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "date" => ["string", "nullable", ],
        ];
    }
}
