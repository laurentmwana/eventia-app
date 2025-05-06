<?php

namespace App\Eloquent;

use App\Models\GuestSeat;
use Illuminate\Http\Request;
use App\Eloquent\SearchDataEloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GuestSeatEloquent extends Builder
{
    private const SEARCH_COLUMNS = ['name', 'description', 'event_id'];

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findSearchAndPaginated(Request $request): LengthAwarePaginator
    {
        $searchValue = $request->query('search');

        $builder =  $this->orderBy("updated_at", "desc");

        return SearchDataEloquent::handle(
            $builder,
            $searchValue,
            self::SEARCH_COLUMNS
        )
            ->paginate();
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
