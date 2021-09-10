<?php

namespace App\Listeners;

use App\Events\CancelAppointment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCancelAppointmentNotification
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
     * @param  CancelAppointment  $event
     * @return void
     */
    public function handle(CancelAppointment $event)
    {
        //
    }
}
