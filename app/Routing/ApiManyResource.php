<?php

namespace App\Routing;

use Illuminate\Routing\Router;

class ApiManyResource
{
    public static function register()
    {
        if ( ! Router::hasMacro('apiManyResource')) {
            Router::macro(
                'apiManyResource',
                function ($name, $controller, $options = []) {
                    Router::delete(
                        $name . '/destroyMany',
                        array_merge(
                            $options,
                            [
                                'uses' => $controller . '@destroyMany',
                                'as' => $name . '.destroyMany',
                            ]
                        )
                    );
                    Router::apiResource(
                        $name,
                        $controller,
                        $options
                    );
                }
            );
        }
    }
}
