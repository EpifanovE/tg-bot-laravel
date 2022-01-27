<?php

declare(strict_types=1);

namespace App\Http\Api\Controllers;

use App\Http\Api\Requests\ResourceIndexRequest;
use App\Http\Api\Resources\Attachment\AttachmentResource;
use App\Http\Api\Resources\Attachment\AttachmentResourceCollection;
use App\Models\Attachment\Attachment;

class AttachmentController extends Controller
{
    public function index(ResourceIndexRequest $request)
    {
        $this->authorize('view', Attachment::class);

        $data = $request->validated();
        $query = $this->applyQueryParams(Attachment::query(), $data);

        return new AttachmentResourceCollection($query);
    }

    public function show(Attachment $attachment)
    {
        return new AttachmentResource($attachment);
    }
}
