<?php

namespace App\Models\LogEvent;

use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LogEvent extends Model
{
    use HasFactory;

    const COMMAND_START = "c_start";
    const COMMAND_UNHANDLED = "unhandled";

    public $timestamps = ["created_at"];

    const UPDATED_AT = null;

    protected $fillable = [
        "code",
        "payload",
        "subscriber_id",
        "created_at",
    ];

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }

    public function scopeSubscribe(Builder $query)
    {
        $query
            ->leftJoin("subscribers AS s", "log_events.subscriber_id", "=", "s.id")
            ->where("code", "=", self::COMMAND_START)
            ->where(DB::raw("log_events.created_at"), "=", DB::raw("s.created_at"));
    }

    public function scopeWithPayload(Builder $query, string $payload)
    {
        $query
            ->where("payload", "LIKE", "%" . $payload . "%");
    }

    public function scopeWithCode(Builder $query, string $code)
    {
        $query
            ->where("code", "LIKE", "%" . mb_strtolower($code) . "%");
    }
}
