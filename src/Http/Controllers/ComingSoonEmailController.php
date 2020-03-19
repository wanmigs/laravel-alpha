<?php

namespace Fligno\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Fligno\Auth\Mail\WebsiteLaunched;
use Fligno\Auth\Models\AppSetting;
use Fligno\Auth\Models\Newsletter;
use Illuminate\Support\Facades\Mail;

class ComingSoonEmailController extends Controller
{
    /**
     * Get app setting for coming_soon value.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $subject = AppSetting::where('key', 'coming_soon_email_subject')->first();
        $content = AppSetting::where('key', 'coming_soon_email_content')->first();

        return response()->json([
            'coming_soon_email_subject' => $subject->value,
            'coming_soon_email_content' => $content->value,
        ]);
    }

    /**
     * Toggle coming_soon value in app setting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update()
    {
        request()->validate([
            'coming_soon_email_subject' => 'required',
            'coming_soon_email_content' => 'required',
        ]);

        AppSetting::where('key', 'coming_soon_email_subject')->update([
            'value' => request()->coming_soon_email_subject
        ]);

        AppSetting::where('key', 'coming_soon_email_content')->update([
            'value' => request()->coming_soon_email_content
        ]);

        return response()->json([], 204);
    }

    /**
     * Send launched email
     */
    public function send()
    {
        $emails = Newsletter::all()->pluck('email')->toArray();

        foreach ($emails as $email) {
            Mail::to($email)->send(new WebsiteLaunched());
        }

        return response()->json([], 204);
    }
}
