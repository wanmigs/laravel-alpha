<?php

namespace App\ResourceModels;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class Post
{
    public static $model = '\App\Post';

    public static $searchColumns = ['title', 'content'];

    public static $headers = [];

    //File name of the compoenent to be added in `/resource/js/admin/pages/resouce/rows`
    // public static $rowComponent = 'User';

    public static $endpoint = [
        'show' => '',
        'store' => '',
        'update' => '',
    ];

    public function form()
    {
        return [
            'title' => [
                'label' => 'Title *',
                'type' => 'text'
            ],
            'content' => [
                'label' => 'Content',
                'type' => 'text'
            ]
        ];
    }

    public function validation()
    {
        return  [
            'title' => ['required', 'string'],
            'content' => ['required']
        ];
    }

    public function updateValidation($request, $model)
    {
        return [];
    }
}
