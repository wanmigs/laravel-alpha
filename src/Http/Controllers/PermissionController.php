<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Fligno\Auth\Traits\Paginators;
use Fligno\Auth\Resources\PaginationCollection;

class PermissionController extends Controller
{
    use Paginators;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = Permission::query();

        if (request('all')) {
            return response()->json($permissions->get()->toArray());
        }

        $columns = ['name'];

        $data = $this->paginate($permissions, $columns);

        return new PaginationCollection($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required|unique:permissions',
        ]);

        $permission = Permission::create(request()->all());

        return response($permission, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        return response($permission, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        request()->validate([
            'name' => 'required',
        ]);

        $permission = tap($permission)->update(request()->all());

        return response()->json($permission);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        //
    }

    /**
     * Multiple Delete
     */
    public function destroyAll()
    {
        Permission::whereIn('id', request('ids'))->delete();

        return response([], 204);
    }
}
