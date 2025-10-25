<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductionOrderSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('production_orders')->truncate();

        $plans = DB::table('production_plans')
            ->where('status', 'approved')
            ->get();

        $staffProduction = DB::table('users')
            ->where('role', 'staff_production')
            ->first();

        if ($plans->isEmpty()) return;

        $orders = [];

        foreach ($plans as $plan) {
            $status = ['waiting', 'in_progress', 'completed', 'shipped'][rand(0, 3)];

            $completedAt = in_array($status, ['completed', 'shipped'])
                ? now()->subDays(rand(1, 3))
                : null;

            $actualQty = null;
            $rejectedQty = 0;

            if (in_array($status, ['completed', 'shipped'])) {
                $rejectedQty = rand(0, floor($plan->quantity * 0.1));
                $actualQty = $plan->quantity - $rejectedQty;
            }

            $orders[] = [
                'production_plan_id' => $plan->id,
                'product_id' => $plan->product_id,
                'quantity' => $plan->quantity,
                'target_date' => $plan->due_date,
                'status' => $status,
                'actual_quantity' => $actualQty,
                'rejected_quantity' => $rejectedQty,
                'completed_by' => $completedAt ? ($staffProduction?->id ?? null) : null,
                'completed_at' => $completedAt,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('production_orders')->insert($orders);
        Schema::enableForeignKeyConstraints();
    }
}
