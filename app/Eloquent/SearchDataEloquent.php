<?php

namespace App\Eloquent;

use App\Exceptions\DataEmptyException;
use Illuminate\Database\Eloquent\Builder;

abstract class SearchDataEloquent
{
    public static function handle(Builder $builder, ?string $queryValue, array $fields): Builder
    {
        if (empty($fields)) {
            throw new DataEmptyException();
        }

        if (null === $queryValue || empty($queryValue)) return $builder;

        return $builder->where(function ($q) use ($queryValue, $fields) {
            foreach ($fields as $key => $field) {
                if ($key === 0) {
                    $q->whereLike($field, "%$queryValue%");
                } else {
                    $q->orWhereLike($field, "%$queryValue%");
                }
            }
        });
    }
}
