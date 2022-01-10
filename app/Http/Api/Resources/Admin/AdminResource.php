<?php

namespace App\Http\Api\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "status" => $this->status,
            "settings" => $this->settings,
            "roles" => $this->roles->pluck("id"),
            "permissions" => $this->permissions(),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
