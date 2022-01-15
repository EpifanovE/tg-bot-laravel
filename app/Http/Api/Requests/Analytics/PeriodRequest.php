<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Analytics;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PeriodRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "key" => ["nullable", Rule::in([
                "week",
                "month",
                "year",
                "current_week",
                "current_month",
                "current_year",
                "customPeriod",
            ]),
            ],
            "from" => ["nullable", "string",],
            "to" => ["nullable", "string",],
            "step" => ["nullable", Rule::in(["day", "month",])],
            "payload" => ["string", "nullable",],
            "code" => ["string", "nullable",],
            "sortBy" => ["string", "nullable",],
            "sortDirection" => ["string", "nullable",],
        ];
    }
}
