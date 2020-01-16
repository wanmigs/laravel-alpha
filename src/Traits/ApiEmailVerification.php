<?php

namespace Fligno\Auth\Traits;

use Fligno\Auth\Notifications\VerifyEmail;

trait ApiEmailVerification
{
    /**
     * Send custom verification email.
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail());
    }
}
