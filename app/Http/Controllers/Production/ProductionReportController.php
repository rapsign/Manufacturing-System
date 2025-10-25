<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\ProductionOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ProductionReportController extends Controller
{

    public function index(Request $request)
    {
        $period = $request->input('period', 'monthly');
        $date = $request->input('date', Carbon::now()->format('Y-m'));

        if ($period === 'weekly') {
            $startDate = Carbon::parse($date)->startOfWeek();
            $endDate = Carbon::parse($date)->endOfWeek();
        } else {
            $startDate = Carbon::parse($date)->startOfMonth();
            $endDate = Carbon::parse($date)->endOfMonth();
        }

        $orders = ProductionOrder::with('product')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        $summary = [
            'total_orders'     => $orders->count(),
            'waiting'          => $orders->where('status', 'waiting')->count(),
            'in_progress'      => $orders->where('status', 'in_progress')->count(),
            'completed'        => $orders->whereIn('status', ['completed', 'shipped'])->count(),
            'total_production' => $orders->sum('actual_quantity'),
            'total_rejected'   => $orders->sum('rejected_quantity'),
        ];

        $byProduct = $orders->groupBy('product_id')->map(function ($group) {
            $totalPlanned  = $group->sum('quantity');
            $totalActual   = $group->sum('actual_quantity');
            $totalRejected = $group->sum('rejected_quantity');
            $completed     = $group->whereIn('status', ['completed', 'shipped'])->count();

            $progress = $totalPlanned > 0
                ? round(($totalActual / $totalPlanned) * 100, 2)
                : 0;

            return [
                'order_id'       => $group->first()->id,
                'product_name'   => $group->first()->product?->name,
                'product_code'   => $group->first()->product?->code,
                'total_planned'  => $totalPlanned,
                'total_actual'   => $totalActual,
                'total_rejected' => $totalRejected,
                'completed'      => $completed,
                'progress'       => $progress,
            ];
        })->values();

        return Inertia::render('Production/Report/Index', [
            'filters'  => [
                'period' => $period,
                'date'   => $date,
            ],
            'summary'   => $summary,
            'byProduct' => $byProduct,
        ]);
    }


    public function show(ProductionOrder $order)
    {
        $order->load(['product', 'productionPlan.creator', 'productionPlan.approver', 'completedBy']);

        return Inertia::render('Production/Report/Show', [
            'order' => [
                'id'                => $order->id,
                'product_name'      => $order->product?->name,
                'product_code'      => $order->product?->code,
                'quantity'          => $order->quantity,
                'actual_quantity'   => $order->actual_quantity,
                'rejected_quantity' => $order->rejected_quantity,
                'target_date'       => $order->target_date?->format('d F Y'),
                'status'            => $order->status,
                'created_by'        => $order->productionPlan?->creator?->name,
                'completed_by'      => $order->completedBy?->name,
                'approved_by'       => $order->productionPlan?->approver?->name,
                'completed_at'      => $order->completed_at?->format('d F Y H:i'),
            ],
        ]);
    }
    public function export(Request $request)
    {
        $period = $request->input('period', 'monthly');
        $date = $request->input('date', now()->format('Y-m'));

        if ($period === 'weekly') {
            $startDate = Carbon::parse($date)->startOfWeek();
            $endDate = Carbon::parse($date)->endOfWeek();
        } else {
            $startDate = Carbon::parse($date)->startOfMonth();
            $endDate = Carbon::parse($date)->endOfMonth();
        }

        $orders = ProductionOrder::with('product')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        $summary = [
            'total_orders'     => $orders->count(),
            'waiting'          => $orders->where('status', 'waiting')->count(),
            'in_progress'      => $orders->where('status', 'in_progress')->count(),
            'completed'        => $orders->whereIn('status', ['completed', 'shipped'])->count(),
            'total_production' => $orders->sum('actual_quantity'),
            'total_rejected'   => $orders->sum('rejected_quantity'),
        ];

        $byProduct = $orders->groupBy('product_id')->map(function ($group) {
            $totalPlanned  = $group->sum('quantity');
            $totalActual   = $group->sum('actual_quantity');
            $totalRejected = $group->sum('rejected_quantity');
            $completed     = $group->whereIn('status', ['completed', 'shipped'])->count();

            $progress = $totalPlanned > 0
                ? round(($totalActual / $totalPlanned) * 100, 2)
                : 0;

            return [
                'product_name'   => $group->first()->product?->name,
                'product_code'   => $group->first()->product?->code,
                'total_planned'  => $totalPlanned,
                'total_actual'   => $totalActual,
                'total_rejected' => $totalRejected,
                'completed'      => $completed,
                'progress'       => $progress,
            ];
        })->values();

        $pdf = Pdf::loadView('pdf.production-report', [
            'period'    => ucfirst($period),
            'startDate' => $startDate->format('d M Y'),
            'endDate'   => $endDate->format('d M Y'),
            'summary'   => $summary,
            'byProduct' => $byProduct,
        ]);

        return $pdf->download("Production_Report_{$period}_{$date}.pdf");
    }
}
