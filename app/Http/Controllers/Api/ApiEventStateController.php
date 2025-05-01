<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Enums\EventStatusEnum;
use App\Enums\EventTypeEnum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class ApiEventStateController extends Controller
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
