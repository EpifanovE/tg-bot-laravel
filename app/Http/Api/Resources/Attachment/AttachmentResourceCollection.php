<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Attachment;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AttachmentResourceCollection extends ResourceCollection
{
    public $collects = AttachmentResourceCollectionItem::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
