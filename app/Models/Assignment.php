<?php

namespace App\Models;

use App\Eloquent\AssignmentEloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    /** @use HasFactory<\Database\Factories\AssignmentFactory> */
    use HasFactory;
    protected $fillable = [
        'type',
        'guest_id',
        'guest_seat_id',
        'is_send_email'
    ];
    
    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    public function guestSeat(): BelongsTo
    {
        return $this->belongsTo(GuestSeat::class);
    }

    public function newEloquentBuilder($query): AssignmentEloquent
    {
        return new AssignmentEloquent($query);
    }
}
