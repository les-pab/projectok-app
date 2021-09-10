<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentImmediateCounselingEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $student_id;
    public $appointment;

    public function __construct($student_id, $appointment)
    {
        $this->student_id = $student_id;
        $this->appointment = $appointment;
    }

    public function broadcastOn()
    {
        return new Channel('student.appointment.' . $this->student_id);
    }
}
