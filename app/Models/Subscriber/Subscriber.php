<?php

namespace App\Models\Subscriber;

use App\Models\LogEvent\LogEvent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        "tid",
        "first_name",
        "last_name",
        "username",
        "language_code",
        "blocked",
    ];

    protected $casts = [
        "blocked" => "boolean",
    ];

    public function events(): HasMany
    {
        return $this->hasMany(LogEvent::class);
    }
}
