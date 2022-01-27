<?php

namespace App\Models\Task;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        "run_at",
    ];

    protected $casts = [
        "run_at" => "datetime",
    ];

    public function entity(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeMustBeRun(Builder $builder)
    {
        $builder
            ->whereDate("run_at", "<=", Carbon::now())
            ->whereTime("run_at", "<=", Carbon::now());
    }
}
