<?php

namespace App\Http\Controllers\DataValues;

use App\Enums\EventStatusEnum;
use App\Enums\EventTypeEnum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class DataValueEventStateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'status' => EventStatusEnum::cases(),
            'types' => EventTypeEnum::cases(),
        ]);
    }
}
