<?php

namespace App\Models;

use App\Eloquent\GuestSeatEloquent;
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
        'category',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }

    public function newEloquentBuilder($query): GuestSeatEloquent
    {
        return new GuestSeatEloquent($query);
    }
}
