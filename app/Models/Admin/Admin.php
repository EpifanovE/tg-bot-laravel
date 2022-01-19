<?php

namespace App\Models\Admin;

use App\Models\Subscriber\Subscriber;
use App\Notifications\PasswordReset;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
        'settings',
        'built_in',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'settings' => 'array',
    ];

    protected $attributes = [
        "settings" => '{"locale":"ru","theme":"light"}',
    ];

    public function isActive(): bool
    {
        return $this->status === Status::ACTIVE;
    }

    public function isPending(): bool
    {
        return $this->status === Status::PENDING;
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, "admin_role");
    }

    public function permissions(): array
    {
        return $this->roles->pluck("permissions")->flatten()->toArray();
    }

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }

    public function verifyToken(): HasOne
    {
        return $this->hasOne(VerifyToken::class);
    }

    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->permissions());
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordReset($token));
    }

    public function receivesBroadcastNotificationsOn()
    {
        return 'admins.notifications.' . $this->id;
    }

    public function scopeStatus(Builder $query, string $status)
    {
        $query->where("status", $status);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where("name", "LIKE", '%' . $search . '%')
            ->orWhere("email", "LIKE", '%' . $search . '%')
            ->orWhere("id", "LIKE", '%' . $search . '%');
    }
}
