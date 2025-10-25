<?php

namespace App\Http\Controllers\PPIC;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductionPlan;
use Carbon\Carbon;

class ProductionPlanController extends Controller
{
    public function index()
    {
        $productionPlans = ProductionPlan::with(['product', 'creator'])
            ->orderBy('id', 'desc')
            ->paginate(50)
            ->through(fn($plan) => [
                'id' => $plan->id,
                'product' => $plan->product ? [
                    'id' => $plan->product->id,
                    'code' => $plan->product->code,
                    'name' => $plan->product->name,
                ] : null,
                'quantity' => $plan->quantity,
                'due_date' => $plan->due_date
                    ? Carbon::parse($plan->due_date)->format('d F Y')
                    : null,
                'status' => $plan->status,
                'notes' => $plan->notes,
                'creator' => $plan->creator ? [
                    'id' => $plan->creator->id,
                    'name' => $plan->creator->name,
                ] : null,
            ]);

        return Inertia::render('PPIC/ProductionPlan/Index', [
            'productionPlans' => $productionPlans,
        ]);
    }
    public function create()
    {
        $products = Product::all(['id', 'name', 'code']);
        return Inertia::render('PPIC/ProductionPlan/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
            'due_date'   => 'required|date',
            'notes'      => 'nullable|string',
        ]);
        ProductionPlan::create($validated);
        return redirect()->route('ppic.production-plans.index')
            ->with('success', 'Production Plan created successfully!');
    }

    public function submit(ProductionPlan $plan)
    {
        if ($plan->status !== 'draft') {
            return back()->with('error', 'Only draft plans can be submitted.');
        }
        $plan->update(['status' => 'pending']);
        return back()->with('success', 'Production Plan submitted successfully!');
    }

    public function destroy(ProductionPlan $plan)
    {
        $plan->delete();
        return back()->with('success', 'Product deleted successfully!');
    }
};
