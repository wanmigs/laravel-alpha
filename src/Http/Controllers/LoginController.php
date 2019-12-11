<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Fligno\Auth\Traits\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;
}
