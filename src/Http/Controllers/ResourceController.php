<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Fligno\Auth\Traits\Paginators;
use App\Http\Resources\PaginationCollection;

class ResourceController extends Controller
{
    use Paginators;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!file_exists(app_path('ResourceModels'))) {
            return response([], 200);
        }

        $resources = array_diff(scandir(app_path('ResourceModels')), ['..', '.']);
        $pattern = '/(.*?[a-z]{1})([A-Z]{1}.*?)/';
        $replace = '${1} ${2}';
        $slug = '${1}-${2}';
        $data = [];

        foreach ($resources as $resource) {
            $resource = str_replace('.php', '', $resource);

            $data[] = [
                'title' => preg_replace($pattern, $replace, $resource),
                'slug' => strtolower(preg_replace($pattern, $slug, $resource))
            ];
        }

        return response($data, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @param String $slug
     * @return Collection
     */
    public function getData($slug)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $resource = new $instance;
        $model = new $resource::$model;
        $query = $model::query();

        if (request('all')) {
            return response()->json($query->get()->toArray());
        }

        $columns = $resource::$searchColumns ?? [];

        $data = $this->paginate($query, $columns);

        return new PaginationCollection($data);
    }

    /**
     * Get Resource Model
     *
     * @param [string] $slug
     * @return Array
     */
    public function get($slug)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $title = Str::title(str_replace('-', ' ', $slug));
        $resource = new $instance;
        $model = new $resource::$model;
        $columns = DB::connection()->getSchemaBuilder()->getColumnListing($model->getTable());
        $filtered = [];

        foreach (array_diff($columns, $model->getHidden()) as $column) {
            $filtered[$column]['label'] = Str::title(str_replace('_', ' ', $column));
        }

        return response([
            "title" => [
                "singular" => $title,
                "plural" => Str::plural($title),
            ],
            "columns" => $filtered,
            "form" => $resource::$form ?? []
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    /**
     * Display the specified resource.
     *
     * @param String $slug
     * @param Int $idg
     * @return void
     */
    public function show($slug, $id)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $resource = new $instance;
        $model = new $resource::$model;

        $data = $model->find($id);

        return response($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($slug)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $resource = new $instance;
        $model = new $resource::$model;

        request()->validate($resource::$validation ?? []);

        $data = $model::create(request()->all());

        return response($data, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param String $slug
     * @param Int $id
     * @return void
     */
    public function update($slug, $id)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $resource = new $instance;
        $model = new $resource::$model;

        $data = $model->find($id);

        request()->validate($resource::$updateValidation ?? $resource::$validation ?? []);

        $data = tap($data)->update(request()->all());

        return response()->json($data);
    }

    /**
     * Multiple Delete
     */
    public function destroyAll($slug)
    {
        $model = ucfirst(Str::camel($slug));
        $instance = "App\ResourceModels\\{$model}";
        $resource = new $instance;
        $model = new $resource::$model;
        $model::whereIn('id', request('ids'))->delete();

        return response([], 204);
    }
}
