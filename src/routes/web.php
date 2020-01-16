<?php

Route::view('login', 'Auth::login');
Route::view('register', 'Auth::register');
Route::view('email/verify', 'Auth::verification')->name('verification.verify')->middleware('signed');
