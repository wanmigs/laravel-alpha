<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Fligno\Auth\Models\AppSetting;

class ComingSoonController extends Controller
{
    /**
     * Get app setting for coming_soon value.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $setting = AppSetting::where('key', 'coming_soon')->first();

        return response()->json(['coming_soon' => $setting->value === 'true']);
    }

    /**
     * Toggle coming_soon value in app setting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update()
    {
        $setting = AppSetting::where('key', 'coming_soon')->first();

        $setting->update([
            'value' => $setting->value === 'true' ? 'false' : 'true',
        ]);

        return response()->json([], 204);
    }
}
