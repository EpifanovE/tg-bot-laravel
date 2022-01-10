<?php

declare(strict_types=1);

namespace App\Http\Api\Resources\Setting;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SettingResourceCollection extends ResourceCollection
{
    public $collects = SettingResourceCollectionItem::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
