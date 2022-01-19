<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\DestroyManyRequest;
use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Requests\Subscriber\SubscriberUpdateRequest;
use App\Http\Api\Resources\Subscriber\SubscriberResource;
use App\Http\Api\Resources\Subscriber\SubscriberResourceCollection;
use App\Models\Subscriber\Subscriber;
use App\UseCases\Subscriber\SubscriberService;

class SubscriberController extends Controller
{
    private SubscriberService $service;

    public function __construct(SubscriberService $service)
    {
        $this->service = $service;
    }

    public function index(ResourceIndexRequest $request)
    {
        $this->authorize("view", Subscriber::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Subscriber::query(), $data);

        return new SubscriberResourceCollection($query);
    }

    public function show(Subscriber $subscriber)
    {
        $this->authorize('view', Subscriber::class);

        return new SubscriberResource($subscriber);
    }

    public function update(SubscriberUpdateRequest $request, Subscriber $subscriber)
    {
        $this->authorize('manage', Subscriber::class);

        $data = $request->validated();

        $subscriber = $this->service->update($subscriber, $data);

        return new SubscriberResource($subscriber);
    }

    public function block(Subscriber $subscriber)
    {
        $this->authorize('manage', Subscriber::class);

        $subscriber = $this->service->block($subscriber, !$subscriber->blocked);

        return new SubscriberResource($subscriber);
    }

    public function destroy(Subscriber $subscriber)
    {
        $this->authorize('manage', Subscriber::class);

        $this->service->delete($subscriber);
    }

    public function destroyMany(DestroyManyRequest $request) {
        $this->authorize('manage', Subscriber::class);

        $this->service->deleteMany($request->validated());
    }

    protected function filterQueryParams($query, $filter)
    {
        if (!empty($filter["blocked"][0]) && $filter["blocked"][0] === "yes") {
            $query->blocked(true);
        }

        if (!empty($filter["blocked"][0]) && $filter["blocked"][0] === "no") {
            $query->blocked(false);
        }

        if (!empty($filter["search"])) {
            $query->search($filter["search"]);
        }

        return $query;
    }

}
