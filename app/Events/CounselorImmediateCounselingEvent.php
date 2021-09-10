<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CounselorImmediateCounselingEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $counselor_id;
    public $student_id;
    public $appointment;

    public function __construct($counselor_id, $student_id, $appointment)
    {
        $this->counselor_id = $counselor_id;
        $this->student_id = $student_id;
        $this->appointment = $appointment;
    }

    public function broadcastOn()
    {
        return new Channel('counselor.appointment.' . $this->counselor_id);
    }
}
