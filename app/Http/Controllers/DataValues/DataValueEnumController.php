<?php

namespace App\Http\Controllers\DataValues;

use App\Enums\GenderEnum;
use Illuminate\Http\JsonResponse;
use App\Enums\GuestSeatCategoryEnum;
use App\Http\Controllers\Controller;
use App\Enums\AssignmentAvailabilityEnum;
use App\Enums\AssignmentTypeEnum;

class DataValueEnumController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'genders' => GenderEnum::cases(),
            'guest_seat_categories' => GuestSeatCategoryEnum::cases(),
            'availabilities' => AssignmentAvailabilityEnum::cases(),
            'assignment_types' => AssignmentTypeEnum::cases()
        ]);
    }
}
