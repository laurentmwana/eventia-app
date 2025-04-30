<?php

namespace App\Eloquent;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AssignmentEloquent extends Builder
{
    public function findSearchAndPaginated(Request $request): LengthAwarePaginator
    {
        return $this->orderBy("updated_at", "desc")
            ->paginate(10);
    }
    public function findShow(string $id): Event
    {
        return $this->with(['event', 'assignments'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }
}
