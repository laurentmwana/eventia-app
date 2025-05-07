<?php

namespace App\Eloquent;

use App\Models\Event;
use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GuestEloquent extends Builder
{
    private const SEARCH_COLUMNS = [
        'id',
        'name',
        'firstname',
        'gender',
        'event_id'
    ];


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
     * @return Guest
     */
    public function findShow(string $id): Guest
    {
        return $this->with(['guest', 'guestSeat', 'guestSeat.event'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }

    public function findByEvent(int $eventId)
    {
        return $this->where('event_id', '=', $eventId)
            ->orderByDesc('updated_at')
            ->get(['name', 'id', 'firstname']);
    }
}
