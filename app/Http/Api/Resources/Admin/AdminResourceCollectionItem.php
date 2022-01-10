<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminResourceCollectionItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "status" => $this->status,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
