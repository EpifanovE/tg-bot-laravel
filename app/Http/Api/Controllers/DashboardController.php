<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Models\Subscriber\Subscriber;
use App\Services\Chart\ChartData;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function test(Request $request)
    {
        $data = new ChartData(Subscriber::query());
        $data->currentMonth();
        $arr = $data->toArray();

        return response()->json($arr);
    }
}
