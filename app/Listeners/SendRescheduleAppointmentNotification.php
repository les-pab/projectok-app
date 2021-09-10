<?php

namespace App\Listeners;

use App\Events\RescheduleAppointment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendRescheduleAppointmentNotification
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
     * @param  RescheduleAppointment  $event
     * @return void
     */
    public function handle(RescheduleAppointment $event)
    {
        //
    }
}
