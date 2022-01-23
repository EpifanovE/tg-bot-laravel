<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Setting;

use Illuminate\Http\Resources\Json\JsonResource;

class AnalyticsSettingsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "code" => $this->code,
            "payload" => $this->payload,
            "updated_at" => $this->updated_at,
        ];
    }
}
