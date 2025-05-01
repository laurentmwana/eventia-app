<?php

namespace App\Eloquent;

use App\Models\GuestSeat;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GuestSeatEloquent extends Builder
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
     * @return GuestSeat
     */
    public function findShow(string $id): GuestSeat
    {
        return $this->with(['event', 'assignments'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }
}
