<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductionLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'production_order_id',
        'status',
        'changed_by',
        'notes',
    ];

    public function order()
    {
        return $this->belongsTo(ProductionOrder::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
