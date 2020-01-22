<?php

namespace Fligno\Auth\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

trait Paginators
{
    /**
     * Filter and paginate the query.
     *
     * @param Builder $builder
     * @param array $attributes
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate($builder, array $attributes = [])
    {
        $limit = request('limit', 10);
        $offset = request('offset', 0);
        $currentPage = ($offset / $limit) + 1;
        $keyword = request('keyword');

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $builder = $this->filter($builder, $keyword, $attributes);


        return $builder->paginate($limit);
    }

    /**
     * Filter the query based on the given keyword and attributes.
     *
     * @param Builder $builder
     * @param string $keyword
     * @param array $attributes
     * @return Builder
     */
    protected function filter($builder, $keyword, $attributes)
    {
        return $builder->when($keyword && $attributes, function ($query) use ($attributes, $keyword) {
            foreach ($attributes as $key => $attribute) {
                if (Str::contains($attribute, '.')) {
                    [$relation, $field] = explode('.', $attribute);

                    $query->orWhereHas($relation, function ($query) use ($field, $keyword) {
                        $query->where(DB::raw($field), 'LIKE', "%{$keyword}%");
                    });

                    continue;
                }

                $selector = $key ? 'orWhere' : 'where';
                $query->{$selector}($attribute, 'LIKE', "%{$keyword}%");
            }
        });
    }
}
