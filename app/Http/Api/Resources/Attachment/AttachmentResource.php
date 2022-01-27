<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Attachment;

use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "mime" => $this->mime,
            "ext" => $this->ext,
            "content" => $this->content,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
