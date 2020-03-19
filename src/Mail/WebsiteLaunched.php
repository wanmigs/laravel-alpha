<?php

namespace Fligno\Auth\Mail;

use Fligno\Auth\Models\AppSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WebsiteLaunched extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $subject;
    public $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->subject = AppSetting::where('key', 'coming_soon_email_subject')->first()->value;
        $this->content = AppSetting::where('key', 'coming_soon_email_content')->first()->value;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('Auth::emails.website-launched')
            ->subject($this->subject);
    }
}
