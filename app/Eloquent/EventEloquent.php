<?php

namespace App\Eloquent;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Enums\EventStatusEnum;
use Illuminate\Support\Collection;
use App\Eloquent\SearchDataEloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EventEloquent extends Builder
{
    private const SEARCH_COLUMNS = [
        'id',
        'title',
        'start_at',
        'end_at',
        'status',
        'type',
        'description'
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
     * @return Event
     */
    public function findShow(string $id): Event
    {
        return $this->with(['guestSeats', 'guests'])
            ->orderBy("updated_at", "desc")
            ->findOrFail($id);
    }


    public function findByUserId(int $userId): Collection
    {
        return $this->where('user_id', '=', $userId)
            ->where(function ($builder) {
                $builder->where('start_at', '>=', now())
                    ->orWhere('end_at', '>=', now());
            })->whereIn('status', [
                EventStatusEnum::PENDING->value,
                EventStatusEnum::NEXT->value,
            ])
            ->get(['title', 'status', 'id'])
        ;
    }

    public function findByInvitationPaginated(Request $request)
    {
        $searchValue = $request->query('search');

        $builder =  $this->getQueryByInvitation()
            ->where('user_id', '=', $request->user()->id)
            ->orderBy("updated_at", "desc");

        return SearchDataEloquent::handle(
            $builder,
            $searchValue,
            self::SEARCH_COLUMNS
        )
            ->paginate();
    }

    public function findByInvitation(string $id): Event
    {
        return $this->getQueryByInvitation()->findOrFail($id);
    }

    private function getQueryByInvitation()
    {
        return $this->with(['guests', 'guestSeats'])
            ->orderBy("updated_at", "desc");
    }
}
