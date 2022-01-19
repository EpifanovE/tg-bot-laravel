<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Auth\AuthController@login')->name('login');
Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
    ->name('password.email');
Route::post('/password/reset', 'Auth\ForgotPasswordController@reset')
    ->name('password.reset');

Route::get('/refresh-csrf', 'Auth\AuthController@csrfToken')->name('csrf');

Route::get("/test", "AnalyticsController@test");

Route::middleware(['auth:sanctum', 'status'])->group(
    function () {
        Route::post('logout', 'Auth\AuthController@logout')->name('logout');

        Route::get('/profile', 'ProfileController@show');
        Route::put('/profile', 'ProfileController@update');

        Route::apiManyResource('admins', 'AdminController');

        Route::apiManyResource('roles', 'RoleController');
        Route::get("/permissions", "RoleController@permissions")->name("permissions.index");

        Route::apiManyResource('settings', 'SettingController');

        Route::post('subscribers/{subscriber}/block', 'SubscriberController@block');
        Route::apiManyResource('subscribers', 'SubscriberController');

        Route::get("/analytics/newSubscribers", "AnalyticsController@newSubscribers");
        Route::get("/analytics/newSubscribersTable", "AnalyticsController@newSubscribersTable");
        Route::get("/analytics/uniqueUsages", "AnalyticsController@uniqueUsages");
        Route::get("/analytics/commands", "AnalyticsController@commands");
        Route::get("/analytics/commandsTable", "AnalyticsController@commandsTable");
        Route::get("/analytics/unhandled", "AnalyticsController@unhandled");
        Route::get("/analytics/unhandledTable", "AnalyticsController@unhandledTable");
    });
