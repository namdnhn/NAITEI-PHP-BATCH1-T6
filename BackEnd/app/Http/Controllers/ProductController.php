<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products
    public function index(Request $request)
    {
        $sort = $request->query('sort', '');
        $search = $request->query('search', '');
        $products = Product::query();

        if ($search) {
            $products->where('name', 'like', "%$search%");
        }
        switch ($sort) {
            case 'price_low_to_high':
                $products->orderBy('price', 'asc');
                break;
            case 'price_high_to_low':
                $products->orderBy('price', 'desc');
                break;
            case 'newest_to_oldest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'ranking':
                // có một cột `ranking` trong bảng products
                $products->orderBy('ranking', 'desc');
                break;
            default:
                $products->orderBy('created_at', 'asc');
                break;
        }

        $products = $products->get();

        // Thêm URL đầy đủ cho hình ảnh
        foreach ($products as $product) {
            $product->image_url = asset($product->image);
        }

        return response()->json($products);
    }


    // Get a single product
    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    // Create a new product
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($request->all());
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    public function get_detail_info_product($id)
    {
        $product = Product::find($id)->with('variants', 'variants.sizes', 'variants.images')->first();
        if ($product) {
            if (!$product->image) {
                $product->image = $product->variants[0]->images[0]->url;
            }
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }


}
