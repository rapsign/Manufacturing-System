<?php

namespace App\Http\Controllers\Manager;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WarehouseController extends Controller
{
    public function index(Request $request)
    {
        $warehouses = Warehouse::with('product')
            ->orderByDesc('received_at')
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->id,
                'product' => [
                    'name' => $item->product?->name,
                    'code' => $item->product?->code,
                ],
                'stock' => $item->stock,
                'received_at' => $item->received_at
                    ? $item->received_at->format('d F Y')
                    : '-',
                'notes' => $item->notes ?? '-',
            ]);

        return Inertia::render('Manager/Warehouse/Index', [
            'warehouses' => $warehouses,
        ]);
    }
}
