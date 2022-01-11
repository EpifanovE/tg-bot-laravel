<?php

namespace App\Models\Subscriber;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        "tid",
        "name",
        "blocked",
    ];

    protected $casts = [
        "blocked" => "boolean",
    ];
}
