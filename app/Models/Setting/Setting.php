<?php

namespace App\Models\Setting;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        "code",
        "payload",
        "payload->events",
    ];

    protected $casts = [
        "payload" => "array",
    ];
}
