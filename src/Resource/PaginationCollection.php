<?php

namespace Fligno\Auth\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;

class PaginationCollection extends ResourceCollection
{
    private $pagination;

    public function __construct($resource)
    {
        $this->pagination = [
            'total' => $resource->total(),
            'count' => $resource->count(),
            'per_page' => $resource->perPage(),
            'current_page' => $resource->currentPage(),
            'total_pages' => $resource->lastPage()
        ];

        $resource = $resource->getCollection();

        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->transform(function ($page) {
                $page->created_at_date = Carbon::parse($page->created_at)->format('M d, Y');
                $page->created_time = Carbon::parse($page->created_at)->format('h:i:s A');

                return $page;
            }),
            'total' => $this->pagination['total']
        ];
    }
}
