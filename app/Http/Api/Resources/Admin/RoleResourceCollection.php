<?php

declare(strict_types=1);


namespace App\Http\Api\Resources\Admin;


use App\Http\Api\Resources\Admin\AdminResourceCollectionItem;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RoleResourceCollection extends ResourceCollection
{
    public $collects = RoleResourceCollectionItem::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
