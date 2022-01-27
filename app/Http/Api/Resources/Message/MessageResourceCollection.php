<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Message;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MessageResourceCollection extends ResourceCollection
{
    public $collects = MessageResourceCollectionItem::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
