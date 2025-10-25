<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductionLog;
use App\Models\ProductionPlan;
use Illuminate\Support\Carbon;
use App\Models\ProductionOrder;

class DashboardController extends Controller
{
    public function manager()
    {
        return Inertia::render('Dashboard/Manager', [
            'stats' => [
                'products' => Product::count(),
                'plans' => ProductionPlan::whereNotIn('status', ['draft'])->count(),
                'pendingPlans' => ProductionPlan::where('status', 'pending')->count(),
                'orders' => ProductionOrder::count(),
            ],
        ]);
    }

    public function ppic()
    {
        $today = Carbon::today();
        $stats = [
            'total_plans' => ProductionPlan::count(),
            'draft' => ProductionPlan::where('status', 'draft')->count(),
            'pending' => ProductionPlan::where('status', 'pending')->count(),
            'approved' => ProductionPlan::where('status', 'approved')->count(),
            'rejected' => ProductionPlan::where('status', 'rejected')->count(),
            'processed' => ProductionPlan::where('status', 'processed')->count(),
            'overdue' => ProductionPlan::whereNotNull('due_date')
                ->where(function ($query) use ($today) {
                    $query->whereDate('due_date', '<', $today)
                        ->orWhereBetween('due_date', [$today, $today->copy()->addDays(3)]);
                })
                ->count(),
        ];

        return Inertia::render('Dashboard/PPIC', [
            'stats' => $stats,
        ]);
    }

    public function production()
    {
        $today = Carbon::today();
        $stats = [
            'total_orders' => ProductionOrder::count(),
            'waiting' => ProductionOrder::where('status', 'waiting')->count(),
            'in_progress' => ProductionOrder::where('status', 'in_progress')->count(),
            'completed' => ProductionOrder::where('status', 'completed')->count(),
            'overdue' => ProductionOrder::whereDate('target_date', '<', $today)
                ->where('status', '!=', 'completed')
                ->count(),
        ];

        $recentLogs = ProductionLog::with(['order.product'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($log) => [
                'status' => $log->status,
                'notes' => $log->notes,
                'product' => $log->order->product->name ?? '-',
                'date' => $log->created_at->diffForHumans(),
            ]);

        return Inertia::render('Dashboard/Production', [
            'stats' => $stats,
            'recentLogs' => $recentLogs,
        ]);
    }
}
