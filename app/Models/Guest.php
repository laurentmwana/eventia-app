<?php

namespace App\Models;

use App\Eloquent\GuestEloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Guest extends Model
{
    /** @use HasFactory<\Database\Factories\GuestFactory> */
    use HasFactory;

    protected $fillable = [
        'event_id',
        'avatar',
        'phone',
        'gender',
        'firstname',
        'name',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function newEloquentBuilder($query): GuestEloquent
    {
        return new GuestEloquent($query);
    }
}
