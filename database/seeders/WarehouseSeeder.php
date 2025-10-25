<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('warehouses')->truncate();
        $shippedOrders = DB::table('production_orders')
            ->select('product_id', DB::raw('SUM(actual_quantity) as total_stock'))
            ->where('status', 'shipped')
            ->groupBy('product_id')
            ->get();

        if ($shippedOrders->isEmpty()) {
            $this->command->warn('Tidak ada production_orders dengan status shipped.');
            Schema::enableForeignKeyConstraints();
            return;
        }

        $warehouses = [];

        foreach ($shippedOrders as $order) {
            $warehouses[] = [
                'product_id' => $order->product_id,
                'stock' => $order->total_stock,
                'received_at' => now(),
                'notes' => 'Barang hasil produksi (' . $order->total_stock . ' unit) dari pesanan #' . $order->product_id .
                    ' telah diterima di gudang pada ' . now()->format('d M Y H:i') . '.',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('warehouses')->insert($warehouses);

        Schema::enableForeignKeyConstraints();
    }
}
