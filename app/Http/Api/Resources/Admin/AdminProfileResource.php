<?php

namespace App\Http\Api\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminProfileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'settings' => $this->settings,
            'roles' => $this->roles->pluck('id'),
            'permissions' => $this->permissions(),
        ];
    }
}
