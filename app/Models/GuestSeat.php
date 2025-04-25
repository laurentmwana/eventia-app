<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GuestSeat extends Model
{
    /** @use HasFactory<\Database\Factories\GuestSeatFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'event_id',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }
}
