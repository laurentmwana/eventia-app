<?php

namespace App\Models;

use App\Eloquent\EventEloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = [
        'image',
        'title',
        'status',
        'description',
        'type',
        'start_at',
        'end_at',
        'user_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }

    public function guestSeats(): HasMany
    {
        return $this->hasMany(GuestSeat::class);
    }

    public function newEloquentBuilder($query): EventEloquent
    {
        return new EventEloquent($query);
    }
}
