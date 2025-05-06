<?php

namespace App\Eloquent;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AssignmentEloquent extends Builder
{
    private const SEARCH_COLUMNS = ['guest_id', 'guest_seat_id', 'type', 'category'];

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findSearchAndPaginated(Request $request): LengthAwarePaginator
    {
        $searchValue = $request->get("search");

        $builder =  $this->orderBy("updated_at", "desc");

        return SearchDataEloquent::handle(
            $builder,
            $searchValue,
            self::SEARCH_COLUMNS
        )->paginate(10);
    }

    /**
     * @param string $id
     * @return Assignment
     */
    public function findShow(string $id): Assignment
    {
        return $this->with(['event', 'assignments'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }
}
