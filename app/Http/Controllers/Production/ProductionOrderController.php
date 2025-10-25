<?php

namespace App\Http\Controllers\Production;

use Inertia\Inertia;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Models\ProductionLog;
use Illuminate\Support\Carbon;
use App\Models\ProductionOrder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductionOrderController extends Controller
{
    public function index()
    {
        $orders = ProductionOrder::with([
            'product',
            'productionPlan.creator',
            'productionPlan.approver',
            'logs.user',
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(50)
            ->through(fn($order) => [
                'id' => $order->id,
                'product' => [
                    'name' => $order->product?->name,
                    'code' => $order->product?->code,
                ],
                'quantity' => $order->quantity,
                'target_date' => $order->target_date?->format('d F Y'),
                'status' => $order->status,
                'actual_quantity' => $order->actual_quantity,
                'rejected_quantity' => $order->rejected_quantity,
                'created_by' => [
                    'id' => $order->productionPlan?->creator?->id,
                    'name' => $order->productionPlan?->creator?->name,
                ],
                'approved_by' => [
                    'id' => $order->productionPlan?->approver?->id,
                    'name' => $order->productionPlan?->approver?->name,
                ],
                'production_logs' => $order->logs->map(fn($log) => [
                    'id' => $log->id,
                    'status' => $log->status,
                    'notes' => $log->notes,
                    'created_at' => $log->created_at->format('d M Y H:i'),
                    'user' => [
                        'id' => $log->user?->id,
                        'name' => $log->user?->name,
                    ],
                ]),
            ]);

        return Inertia::render('Production/ProductionOrder/Index', [
            'orders' => $orders,
        ]);
    }

    public function process(ProductionOrder $order)
    {
        if ($order->status !== 'waiting') {
            return back()->with('error', 'Only waiting orders can be processed.');
        }
        $order->update(['status' => 'in_progress']);

        ProductionLog::create([
            'production_order_id' => $order->id,
            'status' => 'in_progress',
            'changed_by' => Auth::id(),
            'notes' => 'Production process started by ' . Auth::user()->name,
        ]);

        return back()->with('success', 'Order is now being processed.');
    }

    public function complete(Request $request, ProductionOrder $order)
    {
        $validated = $request->validate([
            'actual_quantity' => 'required|integer|min:0',
            'rejected_quantity' => 'nullable|integer|min:0',
            'notes' => 'nullable|string|max:255',
        ]);
        $order->update([
            'status' => 'completed',
            'actual_quantity' => $validated['actual_quantity'],
            'rejected_quantity' => $validated['rejected_quantity'] ?? 0,
            'completed_by' => Auth::id(),
            'completed_at' => now(),
        ]);
        $order->logs()->create([
            'status' => 'completed',
            'changed_by' => Auth::id(),
            'notes' => trim(
                'Production completed by ' . Auth::user()->name .
                    (!empty($validated['notes']) ? '. Notes: ' . $validated['notes'] : '')
            ),
        ]);

        return back()->with('success', 'Production order marked as completed.');
    }

    public function ship(ProductionOrder $order)
    {
        $actualQuantity = $order->actual_quantity ?? 0;

        if ($actualQuantity <= 0) {
            return back()->with('error', 'No actual quantity available to ship.');
        }
        $warehouseItem = Warehouse::firstOrCreate(
            ['product_id' => $order->product_id],
            ['stock' => 0]
        );
        $warehouseItem->increment('stock', $actualQuantity);
        $warehouseItem->update([
            'received_at' => now(),
            'notes' => 'Barang hasil produksi (' . $actualQuantity . ' unit) dari pesanan #' . $order->id .
                ' telah diterima di gudang pada ' . now()->format('d M Y H:i') . '.'
        ]);
        $order->update(['status' => 'shipped']);
        $order->logs()->create([
            'status' => 'shipped',
            'changed_by' => Auth::id(),
            'notes' => 'Production order shipped to warehouse by ' . Auth::user()->name,
        ]);
        return back()->with('success', 'Production order has been shipped to warehouse successfully!');
    }
}
