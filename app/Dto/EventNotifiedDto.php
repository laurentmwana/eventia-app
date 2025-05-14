<?php

namespace App\Dto;

class EventNotifiedDto
{
    public int $eventId;

    public function __construct(array $data)
    {
        $this->eventId = $data['event_id'];
    }
}
