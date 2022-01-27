<?php

namespace App\Models\Message;

use App\Jobs\TelegramBulkSend;
use App\Jobs\TelegramSendMessage;
use App\Models\Admin\Admin;
use App\Models\Attachment\Attachment;
use App\Models\Subscriber\Subscriber;
use App\Models\Task\Task;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class Message extends Model
{
    use HasFactory;

    const STATUS_DRAFT = "draft";
    const STATUS_PUBLISHED = "published";
    const STATUS_PLANNED = "planned";

    protected $fillable = [
        "name",
        "body",
        "status",
        "parse_mode",
        "published_at",
    ];

    protected $casts = [
        "published_at" => "datetime",
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function(Message $message) {
            $message->task()->delete();
        });
    }

    public function run()
    {
        $this->sendToAll();

        $this->published_at = \Illuminate\Support\Carbon::now();
        $this->status = self::STATUS_PUBLISHED;
        $this->save();
    }

    public function sendToAll()
    {
        $subscribers = Subscriber::blocked(false)->pluck("tid")->toArray();
        $this->sendToTelegramSubscribers($subscribers);
    }

    public function sendToAdmins(array $adminIds)
    {
        $tids = Admin::whereIn("id", $adminIds)
            ->has("subscriber")
            ->with("subscriber")
            ->get()
            ->pluck("subscriber.tid")
            ->toArray();

        $this->sendToTelegramSubscribers($tids);
    }

    protected function sendToTelegramSubscribers(array $subscribersIds)
    {
        if (count($subscribersIds) === 0) {
            return;
        }

        foreach ($subscribersIds as $id) {
            TelegramSendMessage::dispatch($this, $id);
        }
    }

    public function task(): MorphOne
    {
        return $this->morphOne(Task::class, "entity");
    }

    public function attachments(): MorphToMany
    {
        return $this->morphToMany(Attachment::class, "attachmentable");
    }

    public function scopeStatus(Builder $query, string $status)
    {
        $query->where("status", $status);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where("title", "LIKE", '%' . $search . '%')
            ->orWhere("body", "LIKE", '%' . $search . '%')
            ->orWhere("id", "LIKE", '%' . $search . '%');
    }
}
