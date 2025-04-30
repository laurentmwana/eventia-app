<?php

namespace App\Enums;

enum AssignmentAvailabilityEnum: string
{
    case PENDING = "En attente";

    case ACCEPT = "Accepter";

    case REFUSE = "Réfuser";

}
