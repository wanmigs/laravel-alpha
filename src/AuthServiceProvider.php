<?php

namespace Fligno\Auth;

use Illuminate\Support\ServiceProvider;
use Fligno\Auth\Providers\RouteServiceProvider;
use Illuminate\Database\Eloquent\Factory as EloquentFactory;

class AuthServiceProvider extends ServiceProvider
{
    protected $defer = true;

    /**
     * Bootstrap the application events.
     *
     * @return void
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function boot()
    {
        // Load view
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'Auth');

        // Load migrations
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');

        // Load factories
        $this->registerEloquentFactoriesFrom(__DIR__ . '/database/factories');

        $this->publishes([
            __DIR__ . '/resources/js' => resource_path('/js'),
            __DIR__ . '/config/frontend.php' => config_path('frontend.php'),
            __DIR__ . '/tests/Feature' => base_path('tests/Feature')
        ], 'auth');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
    }

    /**
     * Register factories.
     *
     * @param string $path
     * @return void
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    protected function registerEloquentFactoriesFrom($path)
    {
        $this->app->make(EloquentFactory::class)->load($path);
    }
}
