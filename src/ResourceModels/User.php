<?php

namespace App\ResourceModels;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class User
{
    public static $model = 'App\User';

    public static $searchColumns = ['name', 'email'];

    public static $headers = [
        'name',
        'email',
        'email_verifeid_at',
        'created_at',
        'updated_at',
        'enabled:row=false,width=120',
        'actions:row=false,width=180',
    ];

    //File name of the compoenent to be added in `/resource/js/admin/pages/resouce/rows`
    public static $rowComponent = 'User';

    public static $endpoint = [
        'show' => '/api/user/{id}',
        'store' => '/api/user',
        'update' => '/api/user/{id}',
    ];

    public function form()
    {
        $roles = Role::all();
        $options = $roles->map(function ($item, $key) {
            return [
                'value' => $item->name,
                'label' => $item->name
            ];
        });

        return [
            'name' => [
                'label' => 'Name *',
                'type' => 'text'
            ],
            'email' => [
                'label' => 'Email *',
                'type' => 'email'
            ],
            'role' => [
                'label' => 'Role *',
                'type' => 'select',
                'options' => $options
            ],
            'password' => [
                'label' => 'Password *',
                'type' => 'password'
            ],
            'password_confirmation' => [
                'label' => 'Confirm Password',
                'type' => 'password'
            ],
        ];
    }

    public function validation()
    {
        return  [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function updateValidation($request, $model)
    {
        $passwordValidate = $request['password']
            ? ['password' => ['required', 'string', 'min:8', 'confirmed']]
            : [];

        return array_merge([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $model->id],
        ], $passwordValidate);
    }
}
