<?php

namespace App\Enums;

enum EventTypeEnum: string
{
    case CONFERENCE = "conférence";
    case WEDDING = "mariage";
    case BIRTHDAY = "Anniversaire";
    case OTHER = "Manifestation";
}
