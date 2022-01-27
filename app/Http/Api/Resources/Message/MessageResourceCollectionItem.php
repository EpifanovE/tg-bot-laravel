<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Message;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResourceCollectionItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "status" => $this->status,
            "run_at" => $this->task()->exists() ? $this->task->run_at : null,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
