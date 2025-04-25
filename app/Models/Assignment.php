<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    /** @use HasFactory<\Database\Factories\AssignmentFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'category',
        'guest_id',
        'guest_seat_id',
    ];

    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    public function guestSeat(): BelongsTo
    {
        return $this->belongsTo(GuestSeat::class);
    }
}
