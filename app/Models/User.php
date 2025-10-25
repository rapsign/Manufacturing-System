<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'module',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function createdProductionPlans()
    {
        return $this->hasMany(ProductionPlan::class, 'created_by');
    }

    public function approvedProductionPlans()
    {
        return $this->hasMany(ProductionPlan::class, 'approved_by');
    }

    public function completedProductionOrders()
    {
        return $this->hasMany(ProductionOrder::class, 'completed_by');
    }

    public function productionLogs()
    {
        return $this->hasMany(ProductionLog::class, 'changed_by');
    }

    // Scopes
    public function scopePpic($query)
    {
        return $query->where('module', 'ppic');
    }

    public function scopeProduction($query)
    {
        return $query->where('module', 'production');
    }

    public function scopeManager($query)
    {
        return $query->where('role', 'manager');
    }

    public function scopeStaff($query)
    {
        return $query->where('role', 'staff');
    }

    // Helpers
    public function isManager()
    {
        return $this->role === 'manager';
    }

    public function isStaff()
    {
        return $this->role === 'staff';
    }

    public function isPpic()
    {
        return $this->module === 'ppic';
    }

    public function isProduction()
    {
        return $this->module === 'production';
    }
}
