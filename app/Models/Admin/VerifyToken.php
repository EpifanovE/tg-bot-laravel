<?php

declare(strict_types=1);

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Admin\VerifyToken
 *
 * @property int $admin_id
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Admin\Admin $admin
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken query()
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken whereAdminId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VerifyToken whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class VerifyToken extends Model
{
    protected $primaryKey = "admin_id";

    protected $fillable = [
        "token",
        "email",
    ];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

}
