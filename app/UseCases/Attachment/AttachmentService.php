<?php

declare(strict_types=1);

namespace App\UseCases\Attachment;

use App\Models\Attachment\Attachment;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Spatie\Image\Manipulations;

class AttachmentService
{
    public function createMany(array $data): ?Collection
    {
        if (empty($data["files"])) {
            return null;
        }

        $attachments = collect();

        foreach ($data["files"] as $file) {
            /**
             * @var UploadedFile $file
             */
            $ext = $file->extension();

            $attachment = Attachment::create([
                "ext" => $ext,
                "mime" => $file->getMimeType(),
            ]);

            Storage::disk("uploads")->putFileAs("/", $file, "{$attachment->id}/full.{$ext}");

            $thumb = Image::make($file);
            $thumb->fit(200, 200);

            Storage::disk("uploads")->put("{$attachment->id}/thumb.{$ext}", $thumb->encode());

            $attachment->save();

            $attachments->push($attachment);
        }

        return $attachments;
    }

    public function create(array $data)
    {
        if (empty($data["files"])) {
            return null;
        }
    }

    public function delete(Attachment $attachment)
    {
        Storage::disk("uploads")->delete("{$attachment->id}.{$attachment->ext}");
        $attachment->delete();
    }

    public function deleteMany(array $ids)
    {

    }
}
