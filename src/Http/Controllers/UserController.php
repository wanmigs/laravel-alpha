<?php

namespace Fligno\Auth\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $resource = new \App\ResourceModels\User;

        request()->validate($resource->validation() ?? []);

        $user = User::create(
            array_merge([
                'password' => bcrypt(request('password')),
            ], request()->only(['name', 'email']))
        );

        $user->assignRole(request('role'));

        return response($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->role = $user->getRoleNames()[0] ?? '';
        return response($user, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $resource = new \App\ResourceModels\User;

        request()->validate($resource->updateValidation($request, $user));

        $attr = ['name', 'email'];

        if (request('password')) {
            $attr[] = 'password';
        }

        $request = request()->only($attr);

        if (array_key_exists('password', $request)) {
            $request['password'] = Hash::make($request['password']);
        }

        $user->update($request);
        $user->syncRoles(request('role'));

        return response([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
