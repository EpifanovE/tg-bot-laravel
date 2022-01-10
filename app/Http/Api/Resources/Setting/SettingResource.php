<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Setting;

use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "code" => $this->code,
            "name" => $this->name,
            "type" => $this->type,
            "payload" => $this->payload,
            "built_in" => $this->built_in,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
