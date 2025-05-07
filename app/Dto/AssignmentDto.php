<?php

namespace App\DTO;

use App\Enums\GuestSeatCategoryEnum;
use App\Enums\AssignmentTypeEnum;

class AssignmentDto
{
    public int $guestId;
    public int $guestSeatId;
    public AssignmentTypeEnum $type;

    public function __construct(array $data)
    {
        $this->guestId = $data['guest_id'];
        $this->guestSeatId = $data['guest_seat_id'];
        $this->type = AssignmentTypeEnum::from($data['type']);
    }
}
