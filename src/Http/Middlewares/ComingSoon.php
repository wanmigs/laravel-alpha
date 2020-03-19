<?php

namespace Fligno\Auth\Http\Middlewares;

use Closure;
use Fligno\Auth\Models\AppSetting;

class ComingSoon
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [
        'admin',
        'admin/*',
        'coming-soon',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $comingSoon = AppSetting::where('key', 'coming_soon')->first();

        if (!$comingSoon) {
            return $next($request);
        }

        if ($comingSoon->value == 'true') {
            if ($this->inExceptArray($request)) {
                return $next($request);
            }

            return redirect('/coming-soon');
        }

        if ($comingSoon->value == 'false' && $request->is('coming-soon')) {
            return redirect('/');
        }

        return $next($request);
    }

    /**
     * Determine if the request has a URI that should be accessible in coming soon mode.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function inExceptArray($request)
    {
        foreach ($this->except as $except) {
            if ($except !== '/') {
                $except = trim($except, '/');
            }

            if ($request->fullUrlIs($except) || $request->is($except)) {
                return true;
            }
        }

        return false;
    }
}
