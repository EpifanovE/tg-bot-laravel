<?php

declare(strict_types=1);

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        "key",
        "name",
        "permissions",
        "built_in",
    ];

    protected $casts = [
        "permissions" => "array",
        "built_in" => "boolean",
    ];

    public function admins() : BelongsToMany
    {
        return $this->belongsToMany(Admin::class, "admin_role");
    }
}
