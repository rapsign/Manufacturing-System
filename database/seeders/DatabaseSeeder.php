<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        $this->call([
            UserSeeder::class,
            ProductSeeder::class,
            ProductionPlanSeeder::class,
            ProductionOrderSeeder::class,
            ProductionLogSeeder::class,
            WarehouseSeeder::class,
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
