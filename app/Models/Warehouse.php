<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = [
        'product_id',
        'stock',
        'received_at',
        'notes'
    ];

    protected $casts = [
        'received_at' => 'date',

    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
