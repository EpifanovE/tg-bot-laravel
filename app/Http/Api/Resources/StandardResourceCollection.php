<?php

namespace App\Http\Api\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class StandardResourceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
