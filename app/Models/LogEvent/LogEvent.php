<?php

namespace App\Models\LogEvent;

use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogEvent extends Model
{
    const COMMAND_START = "command_start";

    public $timestamps = false;

    protected $fillable = [
        "code",
        "payload",
        "subscriber_id",
    ];

    protected $casts = [
        "payload" => "array",
    ];

    public function setCreatedAtAttribute($value) {
        $this->attributes['created_at'] = \Carbon\Carbon::now();
    }

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }
}
