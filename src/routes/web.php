<?php

Route::view('login', 'Auth::login')->name('login');
Route::view('register', 'Auth::register')->name('register');
Route::view('password/reset', 'Auth::reset')->name('password.reset');
Route::view('password/forget', 'Auth::forget')->name('password.email');
Route::view('email/verify', 'Auth::verification')->name('verification.verify')->middleware('signed');

Route::view('admin/login', 'Auth::admin.login')->name('login');
Route::view('admin/{path?}', 'Auth::admin.index')
    ->where('path', '^((?!login).)*')
    ->name('admin.home');
