<?php

namespace App\Dto;

use App\Enums\EventTypeEnum;
use Illuminate\Support\Carbon;
use Illuminate\Http\UploadedFile;

class EventDto
{
    public ?UploadedFile $image;
    public string $title;
    public EventTypeEnum $type;
    public Carbon $startAt;
    public ?Carbon $endAt;
    public string $description;

    public function __construct(array $data)
    {
        $this->image = $data['image'] ?? null;
        $this->title = $data['title'];
        $this->type = EventTypeEnum::from($data['type']);
        $this->startAt = Carbon::parse($data['start_at']);
        $this->endAt = isset($data['end_at'])
            ? Carbon::parse($data['end_at'])
            : null;
        $this->description = $data['description'];
    }
}
