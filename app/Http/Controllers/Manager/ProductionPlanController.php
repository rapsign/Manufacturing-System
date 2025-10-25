<?php

namespace App\Http\Controllers\Manager;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductionLog;
use App\Models\ProductionPlan;
use Illuminate\Support\Carbon;
use App\Models\ProductionOrder;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductionPlanController extends Controller
{

    public function index()
    {
        $plans = ProductionPlan::with(['product', 'creator'])
            ->whereNotIn('status', ['draft'])
            ->orderBy('created_at', 'desc')
            ->paginate(50)
            ->through(fn($plan) => [
                'id' => $plan->id,
                'product' => [
                    'name' => $plan->product?->name,
                    'code' => $plan->product?->code,
                ],
                'quantity' => $plan->quantity,
                'due_date' => $plan->due_date
                    ? Carbon::parse($plan->due_date)->translatedFormat('d F Y')
                    : '-',
                'creator' => $plan->creator?->name,
                'status' => $plan->status,
                'notes' => $plan->notes,
            ]);

        return Inertia::render('Manager/ProductionPlan/Index', [
            'productionPlans' => $plans,
        ]);
    }

    public function approve(ProductionPlan $plan)
    {
        DB::transaction(function () use ($plan) {
            $plan->update([
                'status' => 'approved',
                'approved_by' => Auth::id(),
                'due_date' => Carbon::now()->addWeekdays(7),
            ]);

            $order = ProductionOrder::create([
                'production_plan_id' => $plan->id,
                'product_id' => $plan->product_id,
                'quantity' => $plan->quantity,
                'target_date' => $plan->due_date,
                'status' => 'waiting',
                'actual_quantity' => 0,
                'rejected_quantity' => 0,
            ]);

            ProductionLog::create([
                'production_order_id' => $order->id,
                'status' => 'waiting',
                'changed_by' => Auth::id(),
                'notes' => 'Production order created automatically after plan approval.',
            ]);
        });

        return back()->with('success', 'Production plan approved and production order created.');
    }

    public function reject(ProductionPlan $plan)
    {
        $plan->update([
            'status' => 'rejected',
            'approved_by' => Auth::id(),
        ]);

        return back()->with('error', 'Production plan has been rejected.');
    }
}
