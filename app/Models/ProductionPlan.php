<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductionPlan extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'due_date',
        'status',
        'created_by',
        'approved_by',
        'notes',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    protected $attributes = [
        'status' => 'draft',
    ];

    protected static function booted()
    {
        static::creating(function ($plan) {
            if (auth()->check() && auth()->user()->role === 'staff_ppic') {
                $plan->created_by = auth()->id();
            }
        });
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function orders()
    {
        return $this->hasMany(ProductionOrder::class);
    }
}
