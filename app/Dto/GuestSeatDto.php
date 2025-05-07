<?php

namespace App\Dto;

use App\Enums\GuestSeatCategoryEnum;

class GuestSeatDto
{
    public string $name;

    public string $description;

    public int $eventId;

    public GuestSeatCategoryEnum $category;


    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->description = $data['description'];
        $this->eventId = (int) $data['event_id'];
        $this->category = GuestSeatCategoryEnum::from($data['category']);
    }
}
