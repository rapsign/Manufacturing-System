<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('production_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_plan_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->date('target_date');
            $table->enum('status', ['waiting', 'in_progress', 'completed', 'shipped'])->default('waiting');
            $table->integer('actual_quantity')->nullable();
            $table->integer('rejected_quantity')->default(0);
            $table->foreignId('completed_by')->nullable()->constrained('users')->onDelete('cascade');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_orders');
    }
};
