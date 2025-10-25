<?php

namespace App\Http\Controllers\PPIC;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProductionPlan;
use Illuminate\Support\Carbon;
use App\Models\ProductionOrder;
use App\Http\Controllers\Controller;

class ProductionPlanReportController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'period' => $request->get('period', 'monthly'),
            'date' => $request->get('date', Carbon::now()->format('Y-m')),
        ];
        if ($filters['period'] === 'weekly') {
            $startDate = Carbon::parse($filters['date'])->startOfWeek();
            $endDate = Carbon::parse($filters['date'])->endOfWeek();
        } else {
            $startDate = Carbon::parse($filters['date'])->startOfMonth();
            $endDate = Carbon::parse($filters['date'])->endOfMonth();
        }
        $plans = ProductionPlan::with(['product', 'orders'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
        $summary = [
            'total_plans' => $plans->count(),
            'total_orders' => $plans->sum(fn($plan) => $plan->orders->count()),
            'total_planned_qty' => $plans->sum('quantity'),
            'total_actual_qty' => $plans->sum(fn($plan) => $plan->orders->sum('actual_quantity')),
            'total_rejected_qty' => $plans->sum(fn($plan) => $plan->orders->sum('rejected_quantity')),
            'average_progress' => round(
                $plans->avg(
                    fn($plan) =>
                    $plan->quantity > 0
                        ? ($plan->orders->sum('actual_quantity') / $plan->quantity) * 100
                        : 0
                ),
                2
            ),
        ];
        $byProduct = $plans
            ->groupBy(fn($plan) => $plan->product?->id)
            ->map(function ($group) {
                $first = $group->first();

                $totalPlanned = $group->sum('quantity');
                $totalActual = $group->sum(fn($plan) => $plan->orders->sum('actual_quantity'));
                $totalRejected = $group->sum(fn($plan) => $plan->orders->sum('rejected_quantity'));

                return [
                    'product_name' => $first->product?->name,
                    'product_code' => $first->product?->code,
                    'total_planned' => $totalPlanned,
                    'total_actual' => $totalActual,
                    'total_rejected' => $totalRejected,
                    'completed' => $group->sum(
                        fn($plan) =>
                        $plan->orders->whereIn('status', ['completed', 'shipped'])->count()
                    ),
                    'progress' => $totalPlanned > 0
                        ? round(($totalActual / $totalPlanned) * 100, 2)
                        : 0,
                ];
            })
            ->values();

        return Inertia::render('PPIC/Report/Index', [
            'filters' => $filters,
            'summary' => $summary,
            'byProduct' => $byProduct,
        ]);
    }
}
