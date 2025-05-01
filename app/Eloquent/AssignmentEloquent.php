<?php

namespace App\Eloquent;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AssignmentEloquent extends Builder
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findSearchAndPaginated(Request $request): LengthAwarePaginator
    {
        $searchValue = $request->get("search");
        
        return $this->orderBy("updated_at", "desc")
            ->paginate(10);
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
