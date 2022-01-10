<?php

namespace App\Http\Api\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function applyQueryParams($query, $data, $disablePaginate = false)
    {
        if (!empty($filter = json_decode($data['filter'] ?? '{}', true))) {
            if (isset($filter['id'])) {
                $query = $query->whereIn('id', $filter['id']);
            }

            if (method_exists($this, 'filterQueryParams')) {
                $query = $this->filterQueryParams($query, $filter);
            }
        }

        if (!empty($sort = json_decode($data['sort'] ?? '{}', true))) {
            $query = $query->orderBy($sort[0], $sort[1]);
        }

        if (!isset($data["paginate"]) || $data["paginate"] !== "0") {
            $query = $query->paginate($data['perPage'] ?? 10);
        } else {
            $query = $query->get();
        }


        return $query;
    }
}
