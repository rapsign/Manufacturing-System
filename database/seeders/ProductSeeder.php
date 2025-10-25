<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->truncate();

        DB::table('products')->insert([
            [
                'code' => 'PRD-001',
                'name' => 'Sensor Suhu Digital',
                'description' => 'Sensor suhu untuk pengukuran lingkungan otomatis.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PRD-002',
                'name' => 'Modul Kontrol Kelembaban',
                'description' => 'Modul kontrol kelembaban udara berbasis mikrokontroler.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PRD-003',
                'name' => 'Casing Plastik IP65',
                'description' => 'Casing pelindung tahan air untuk perangkat sensor outdoor.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PRD-004',
                'name' => 'Adaptor Daya 12V 2A',
                'description' => 'Adaptor daya untuk sistem sensor terintegrasi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PRD-005',
                'name' => 'Kabel Data USB Tipe-C',
                'description' => 'Kabel data untuk koneksi perangkat ke sistem monitoring.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
