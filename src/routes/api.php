<?php

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('users/me', function () {
        return request()->user();
    });

    Route::post('logout', 'LoginController@logout')->name('logout');
});

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('login', 'LoginController@login')->name('login');
    Route::post('register', 'RegisterController@register')->name('register');
    Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'ResetPasswordController@reset');
});

Route::get('email/resend', 'VerificationController@resend')->name('verification.resend')->middleware(['auth:api', 'throttle:60,1']);
Route::get('email/verify/{id}/{hash}', 'VerificationController@verify')->middleware(['throttle:60,1']);
