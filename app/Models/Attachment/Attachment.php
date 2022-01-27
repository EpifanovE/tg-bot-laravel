<?php

namespace App\Models\Attachment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = [
        "mime", "ext",
    ];

    public function getThumbContentAttribute()
    {
        if (!$this->isImage()) {
            return null;
        }

        $path = "{$this->id}/thumb.{$this->ext}";

        if (Storage::disk("uploads")->exists($path)) {
            $fileContent = Storage::disk("uploads")->get($path);
            $base64 = "data:{$this->mime};base64," . base64_encode($fileContent);

            return $base64;
        }

        return "";
    }

    public function getContentAttribute()
    {
        $path = "{$this->id}/full.{$this->ext}";

        if (Storage::disk("uploads")->exists($path)) {
            $fileContent = Storage::disk("uploads")->get($path);
            $base64 = "data:{$this->mime};base64," . base64_encode($fileContent);

            return $base64;
        }

        return "";
    }

    public function isImage()
    {
        return str_contains($this->mime, "image/");
    }
}
