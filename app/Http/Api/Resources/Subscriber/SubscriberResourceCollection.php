<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Subscriber;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SubscriberResourceCollection extends ResourceCollection
{
    public $collects = SubscriberResourceCollectionItem::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
