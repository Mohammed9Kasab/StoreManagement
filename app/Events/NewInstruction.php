<?php

namespace App\Events;

use App\Models\Post;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewInstruction implements shouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $instruction;

    /**
     * Create a new event instance.
     *
     * @param Post $order
     */
    public function __construct(Post $instruction)
    {
        $this->instruction=$instruction;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['store-management'];
    }
    public function broadcastAs()
    {
        return 'new-Instruction';
    }
}
