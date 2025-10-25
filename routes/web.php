<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Manager\ProductController;
use App\Http\Controllers\Manager\WarehouseController;
use App\Http\Controllers\PPIC\ProductionPlanController;
use App\Http\Controllers\PPIC\ProductionPlanReportController;
use App\Http\Controllers\Production\ProductionOrderController;
use App\Http\Controllers\Production\ProductionReportController;
use App\Http\Controllers\Manager\ProductionPlanController as ManagerProductionPlanController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Dashboard Routes 
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    Route::get('/manager', [DashboardController::class, 'manager'])
        ->name('manager.dashboard');
    Route::get('/ppic', [DashboardController::class, 'ppic'])
        ->name('ppic.dashboard');
    Route::get('/production', [DashboardController::class, 'production'])
        ->name('production.dashboard');
});

/*
|--------------------------------------------------------------------------
| Product Management (Manager Only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:manager'])
    ->prefix('manager')
    ->as('manager.')
    ->group(function () {
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::get('/production-plans', [ManagerProductionPlanController::class, 'index'])
            ->name('production-plans.index');
        Route::put('/production-plans/{plan}/approve', [ManagerProductionPlanController::class, 'approve'])
            ->name('production-plans.approve');
        Route::put('/production-plans/{plan}/reject', [ManagerProductionPlanController::class, 'reject'])
            ->name('production-plans.reject');
        Route::get('/warehouse', [WarehouseController::class, 'index'])->name('warehouse.index');
    });

/*
|--------------------------------------------------------------------------
| PPIC Management (Staff PPIC Only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:staff_ppic'])
    ->prefix('ppic')
    ->as('ppic.')
    ->group(function () {
        Route::get('/production-plans', [ProductionPlanController::class, 'index'])
            ->name('production-plans.index');
        Route::get('/production-plans/create', [ProductionPlanController::class, 'create'])
            ->name('production-plans.create');
        Route::post('/production-plans', [ProductionPlanController::class, 'store'])
            ->name('production-plans.store');
        Route::put('/production-plans/{plan}/submit', [ProductionPlanController::class, 'submit'])
            ->name('production-plans.submit');
        Route::delete('/production-plans/{plan}', [ProductionPlanController::class, 'destroy'])
            ->name('production-plans.destroy');
        Route::get('/reports', [ProductionPlanReportController::class, 'index'])
            ->name('reports.index');
    });
Route::middleware(['auth', 'role:staff_production'])
    ->prefix('production')
    ->as('production.')
    ->group(function () {
        Route::get('/production-orders', [ProductionOrderController::class, 'index'])
            ->name('production-orders.index');
        Route::put('/production-orders/{order}/process', [ProductionOrderController::class, 'process'])
            ->name('production-orders.process');
        Route::put('/production-orders/{order}/complete', [ProductionOrderController::class, 'complete'])
            ->name('production-orders.complete');
        Route::put('/production-orders/{order}/ship', [ProductionOrderController::class, 'ship'])
            ->name('production-orders.ship');
        Route::get('/reports/export', [ProductionReportController::class, 'export'])
            ->name('reports.export');
        Route::get('/reports', [ProductionReportController::class, 'index'])
            ->name('reports.index');
        Route::get('/reports/{order}', [ProductionReportController::class, 'show'])
            ->name('reports.show');
    });
