<?php

namespace App\Providers;

use App\Routing\ApiManyResource;
use App\Services\Security\PersonalAccessToken;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ApiManyResource::register();
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
