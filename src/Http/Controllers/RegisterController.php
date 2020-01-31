<?php

namespace Fligno\Auth\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->save();

        $user->assignRole('User');

        $tokenResult = $user->createToken('Personal Access Token');

        event(new Registered($user));

        return response()->json([
            'message' => 'Successfully created user!',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'user_type' => 'admin'
        ], 201);
    }
}
