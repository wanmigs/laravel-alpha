<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Fligno\Auth\Models\Newsletter;
use Fligno\Auth\Traits\Paginators;
use Fligno\Auth\Resources\PaginationCollection;

class NewsletterController extends Controller
{
    use Paginators;

    /**
     * Display a listing of the resource.
     *
     * @return PaginationCollection|\Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $newsletters = Newsletter::query();

        if (request('all')) {
            return response()->json($newsletters->get()->toArray());
        }

        $columns = ['email'];

        $data = $this->paginate($newsletters, $columns);

        return new PaginationCollection($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            'email' => 'required|unique:newsletters,email',
        ]);

        $newsletter = Newsletter::create(request()->all());

        return response($newsletter, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy()
    {
        Newsletter::whereIn('id', request('ids'))->delete();

        return response([], 204);
    }
}
