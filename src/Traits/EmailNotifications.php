<?php

namespace Fligno\Auth\Traits;

use Fligno\Auth\Notifications\ResetPassword;
use Fligno\Auth\Notifications\VerifyEmail;

trait EmailNotifications
{
    /**
     * Send custom verification email.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail());
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }
}
