<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Message;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "body" => $this->body,
            "status" => $this->status,
            "parse_mode" => $this->parse_mode,
            "attachments_ids" => $this->attachments->pluck("id"),
            "run_at" => $this->task()->exists() ? $this->task->run_at : null,
            "published_at" => $this->published_at,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
