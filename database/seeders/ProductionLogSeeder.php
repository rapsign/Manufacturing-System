<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductionLogSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('production_logs')->truncate();

        $orders = DB::table('production_orders')->get();
        $staffProduction = DB::table('users')->where('role', 'staff_production')->first();

        if ($orders->isEmpty()) return;

        $logs = [];
        foreach ($orders as $order) {
            $statusSteps = match ($order->status) {
                'waiting' => ['waiting'],
                'in_progress' => ['waiting', 'in_progress'],
                'completed' => ['waiting', 'in_progress', 'completed'],
                'shipped' => ['waiting', 'in_progress', 'completed', 'shipped'],
                default => ['waiting'],
            };

            $timestamp = now()->subDays(rand(1, 5));
            foreach ($statusSteps as $step) {
                $logs[] = [
                    'production_order_id' => $order->id,
                    'status' => $step,
                    'changed_by' => $staffProduction?->id ?? 1,
                    'notes' => match ($step) {
                        'waiting' => 'Order diterima dan menunggu proses produksi.',
                        'in_progress' => 'Produksi sedang berjalan di lantai produksi.',
                        'completed' => 'Produksi telah selesai dan menunggu pengecekan kualitas.',
                        'shipped' => 'Produk telah dikirim ke gudang barang jadi.',
                        default => '',
                    },
                    'created_at' => $timestamp->addHours(rand(1, 4)),
                    'updated_at' => $timestamp->addHours(rand(1, 4)),
                ];
            }
        }

        DB::table('production_logs')->insert($logs);
        Schema::enableForeignKeyConstraints();
    }
}
