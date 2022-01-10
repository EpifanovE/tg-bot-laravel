<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Auth\AuthController@login')->name('login');
Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
    ->name('password.email');
Route::post('/password/reset', 'Auth\ForgotPasswordController@reset')
    ->name('password.reset');

Route::get('/refresh-csrf', 'Auth\AuthController@csrfToken')->name('csrf');

Route::middleware(['auth:sanctum', 'status'])->group(
    function () {
        Route::post('logout', 'Auth\AuthController@logout')->name('logout');

        Route::get('/profile', 'ProfileController@show');
        Route::put('/profile', 'ProfileController@update');

        Route::apiManyResource('admins', 'AdminController');

        Route::apiManyResource('roles', 'RoleController');
        Route::get("/permissions", "RoleController@permissions")->name("permissions.index");

        Route::apiManyResource('settings', 'SettingController');
    });
