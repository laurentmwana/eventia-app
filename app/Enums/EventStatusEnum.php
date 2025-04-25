<?php

namespace App\Enums;

enum EventStatusEnum: string
{
    case PASSED = "passé";

    case PENDING = "en cours";

    case NEXT = "à venir";
}
