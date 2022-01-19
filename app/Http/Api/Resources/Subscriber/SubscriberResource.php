<?php

namespace App\Http\Api\Resources\Subscriber;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriberResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "tid" => $this->tid,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "username" => $this->username,
            "language_code" => $this->language_code,
            "blocked" => $this->blocked,
            "admin_id" => !empty($this->admin) ? $this->admin->id : null,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
