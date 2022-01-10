<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResourceCollectionItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "key" => $this->key,
            "name" => $this->name,
            "built_in" => $this->built_in,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
