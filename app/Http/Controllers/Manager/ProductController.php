<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::orderBy('id', 'desc')->paginate(5);
        return Inertia::render('Manager/Product/Index', [
            'products' => $products,
        ]);
    }
    public function create()
    {
        return Inertia::render('Manager/Product/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:100|unique:products,code',
            'description' => 'nullable|string|max:500',
        ]);

        Product::create($validated);

        return redirect()
            ->route('manager.products.index')
            ->with('success', 'Product created successfully!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Manager/Product/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:100|unique:products,code,' . $product->id,
            'description' => 'nullable|string',
        ]);

        $product->update($validated);

        return redirect()
            ->route('manager.products.index')
            ->with('success', 'Product updated successfully!');
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Product deleted successfully!');
    }
}
