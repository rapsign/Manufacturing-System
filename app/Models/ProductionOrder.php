<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductionOrder extends Model
{


    protected $fillable = [
        'production_plan_id',
        'product_id',
        'quantity',
        'target_date',
        'status',
        'actual_quantity',
        'rejected_quantity',
        'completed_by',
        'completed_at',
    ];

    protected $casts = [
        'target_date' => 'date',
        'completed_at' => 'datetime',
    ];

    public function plan()
    {
        return $this->belongsTo(ProductionPlan::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function logs()
    {
        return $this->hasMany(ProductionLog::class);
    }
    public function productionPlan()
    {
        return $this->belongsTo(ProductionPlan::class, 'production_plan_id');
    }
    public function completedBy()
    {
        return $this->belongsTo(User::class, 'completed_by');
    }
}
