<?php

namespace App\Eloquent;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EventEloquent extends Builder
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findSearchAndPaginated(Request $request): LengthAwarePaginator
    {
        $searchValue = $request->query('search');
        
        return $this->orderBy("updated_at", "desc")
            ->paginate(10);
    }

    /**
     * @param string $id
     * @return Event
     */
    public function findShow(string $id): Event
    {
        return $this->with(['guestSeats', 'guests'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }
}
