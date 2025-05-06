<?php

namespace App\Http\Controllers\DataValues;

use App\Enums\GenderEnum;
use Illuminate\Http\Request;
use App\Enums\EventStatusEnum;
use App\Enums\GuestSeatCategoryEnum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class DataValueEnumController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'genders' => GenderEnum::cases(),
            'guest_seat_categories' => GuestSeatCategoryEnum::cases()
        ]);
    }
}
