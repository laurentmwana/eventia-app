<?php

namespace App\DTO;

use App\Enums\GenderEnum;
use Illuminate\Http\UploadedFile;

class GuestDto
{
    public ?UploadedFile $avatar;
    public string $name;
    public string $firstname;
    public string $phone;
    public GenderEnum $gender;
    public int $eventId;

    public function __construct(array $data)
    {
        $this->avatar = $data['avatar'] ?? null;
        $this->name = $data['name'];
        $this->firstname = $data['firstname'];
        $this->phone = $data['phone'];
        $this->gender = GenderEnum::from($data['gender']);
        $this->eventId = (int) $data['event_id'];
    }
}
