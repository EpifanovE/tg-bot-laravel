<?php

namespace App\Models\Subscriber;

use App\Models\Admin\Admin;
use App\Models\LogEvent\LogEvent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function logEvents(): HasMany
    {
        return $this->hasMany(LogEvent::class);
    }

    public function admin(): HasOne
    {
        return $this->hasOne(Admin::class);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where("first_name", "LIKE", '%' . $search . '%')
            ->orWhere("last_name", "LIKE", '%' . $search . '%')
            ->orWhere("username", "LIKE", '%' . $search . '%')
            ->orWhere("tid", "LIKE", '%' . $search . '%')
            ->orWhere("id", "LIKE", '%' . $search . '%');
    }

    public function scopeBlocked(Builder $query, bool $blocked)
    {
        return $query
            ->where("blocked", $blocked);
    }
}
