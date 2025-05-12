<?php

namespace App\Jobs;

use App\Models\Guest;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifiedGuestJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private Guest $guest) {}

    /**
     * Execute the job.
     */
    public function handle(): void {}
}
