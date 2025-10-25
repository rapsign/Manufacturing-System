<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductionPlanSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('production_plans')->truncate();

        $ppic = DB::table('users')->where('role', 'staff_ppic')->first();
        $manager = DB::table('users')->where('role', 'manager')->first();
        $products = DB::table('products')->get();

        if ($products->isEmpty() || !$ppic) return;

        $statuses = ['draft', 'pending', 'approved', 'rejected'];
        $plans = [];

        for ($i = 1; $i <= 50; $i++) {
            $product = $products->random();
            $status = $statuses[array_rand($statuses)];

            $plans[] = [
                'product_id' => $product->id,
                'quantity' => rand(50, 250),
                'due_date' => now()->addDays(rand(3, 20)),
                'status' => $status,
                'created_by' => $ppic->id,
                'approved_by' => in_array($status, ['approved', 'rejected']) ? $manager?->id : null,
                'notes' => $this->generateNote($status),
                'created_at' => now()->subDays(rand(0, 7)),
                'updated_at' => now(),
            ];
        }

        DB::table('production_plans')->insert($plans);
        Schema::enableForeignKeyConstraints();
    }

    private function generateNote(string $status): string
    {
        return match ($status) {
            'draft' => 'Rencana awal masih dalam penyusunan.',
            'pending' => 'Menunggu persetujuan manager.',
            'approved' => 'Telah disetujui untuk diproses ke bagian produksi.',
            'rejected' => 'Rencana ditolak karena kendala bahan baku.',
            default => '-',
        };
    }
}
