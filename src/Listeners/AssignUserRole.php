<?php

namespace Fligno\Auth\Listeners;

use Illuminate\Auth\Events\Registered;

class AssignUserRole
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $event->user->assignRole('User');
    }
}
