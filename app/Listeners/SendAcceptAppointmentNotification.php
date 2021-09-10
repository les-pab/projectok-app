<?php

namespace App\Listeners;

use App\Events\AcceptAppointment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendAcceptAppointmentNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AcceptAppointment  $event
     * @return void
     */
    public function handle(AcceptAppointment $event)
    {
        //
    }
}
