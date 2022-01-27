<?php

declare(strict_types=1);

namespace App\UseCases\Message;

use App\Models\Admin\Admin;
use App\Models\Message\Message;
use App\UseCases\Attachment\AttachmentService;
use Carbon\Carbon;

class MessageService
{
    const SAVE_MODE_DRAFT = "draft";
    const SAVE_MODE_PUBLISH = "publish";
    const SAVE_MODE_PLANNED = "planned";
    const SAVE_MODE_TEST = "test";

    private AttachmentService $attachmentService;

    public function __construct(AttachmentService $attachmentService)
    {
        $this->attachmentService = $attachmentService;
    }

    public function create(array $data): Message
    {
        $data["message"]["status"] = Message::STATUS_DRAFT;
        $message = Message::create($data["message"]);

        $this->handleMessage($message, $data);
        $message->refresh();

        return $message;
    }

    public function update(Message $message, array $data): Message
    {
        $message->fill($data["message"]);
        $message->save();
        $message->refresh();

        $this->handleMessage($message, $data);

        if (!empty($data["files"])) {
            $filesCollection = $this->attachmentService->createMany($data);
            $message->attachments()->saveMany($filesCollection);
        }

        $message->refresh();

        return $message;
    }

    public function delete(Message $message)
    {
        $message->delete();
    }

    public function deleteMany(array $ids)
    {
        Message::destroy($ids);
    }

    protected function handleMessage(Message $message, array $data)
    {
        switch ($data["save_mode"]) {
            case self::SAVE_MODE_PUBLISH :
                $this->publish($message);
                break;

            case self::SAVE_MODE_PLANNED :
                if (!empty($data["message"]["run_at"])) {
                    $this->schedule($message, $data["message"]["run_at"]);
                }
                break;

            case self::SAVE_MODE_TEST :
                if (!empty($data["admin_ids"])) {
                    $this->sendToAdmins($message, $data["admin_ids"]);
                }
                break;
            default :
                $message->status = Message::STATUS_DRAFT;
                $message->task()->delete();
                $message->save();

                break;
        }
    }

    protected function publish(Message $message)
    {
        $message->task()->delete();
        $message->sendToAll();

        $message->published_at = \Illuminate\Support\Carbon::now();
        $message->status = Message::STATUS_PUBLISHED;
        $message->save();
    }

    protected function sendToAdmins(Message $message, array $adminIds)
    {
        $message->task()->delete();
        $message->sendToAdmins($adminIds);
    }

    protected function schedule(Message $message, string $time)
    {
        $message->status = Message::STATUS_PLANNED;

        if (!$message->task()->exists()) {
            $message->task()->create([
                "run_at" => Carbon::parse($time),
            ]);
        } else {
            $message->task()->update([
                "run_at" => Carbon::parse($time),
            ]);
        }
        $message->save();
    }
}
