<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\DestroyManyRequest;
use App\Http\Api\Requests\Message\MessageRequest;
use App\Http\Api\Requests\Message\MessageSendToAdminRequest;
use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Resources\Message\MessageResource;
use App\Http\Api\Resources\Message\MessageResourceCollection;
use App\Models\Message\Message;
use App\UseCases\Message\MessageService;

class MessageController extends Controller
{
    private MessageService $service;

    public function __construct(MessageService $service)
    {
        $this->service = $service;
    }

    public function index(ResourceIndexRequest $request)
    {
        $this->authorize("view", Message::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Message::query(), $data);

        return new MessageResourceCollection($query);
    }

    public function store(MessageRequest $request)
    {
        $this->authorize("manage", Message::class);

        $message = $this->service->create($request->validated());

        return new MessageResource($message);
    }

    public function show(Message $message)
    {
        $this->authorize("view", Message::class);

        return new MessageResource($message);
    }

    public function update(MessageRequest $request, Message $message)
    {
        $this->authorize("manage", Message::class);

        $message = $this->service->update($message, $request->validated());

        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        $this->authorize("manage", Message::class);

        $this->service->delete($message);
    }

    public function destroyMany(DestroyManyRequest $request)
    {
        $this->authorize("manage", Message::class);

        $this->service->deleteMany($request->validated()["ids"]);
    }

    protected function filterQueryParams($query, $filter)
    {
        if (!empty($filter["status"])) {
            $query->status($filter["status"][0]);
        }

        if (!empty($filter["search"])) {
            $query->search($filter["search"]);
        }

        return $query;
    }
}
