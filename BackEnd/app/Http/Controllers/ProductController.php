<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variant;
use App\Models\Size;
use App\Models\ProductVariantSize;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    // List products for admin
    public function list(Request $request)
    {
        $limit = $request->query('limit', 10);
        $products = Product::with('variants', 'variants.sizes')->paginate($limit);
        return response()->json($products);
    }

    public function create_new_product(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'variants' => 'required|array',
            'variants.*.name' => 'required|string',
            'variants.*.sizes' => 'required|array',
            'variants.*.sizes.*.name' => 'required|string',
            'variants.*.sizes.*.stock_quantity' => 'required|integer',
            'variants.*.sizes.*.price' => 'required|numeric',
            'variants.*.images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category_id' => $request->input('category_id'),
            ]);

            $firstImagePath = null;

            foreach ($request->input('variants') as $variantIndex => $variantData) {
                $variant = Variant::create([
                    'product_id' => $product->id,
                    'name' => $variantData['name'],
                ]);

                foreach ($variantData['sizes'] as $sizeData) {
                    $size = Size::firstOrCreate(['name' => $sizeData['name']]);
                    ProductVariantSize::create([
                        'variant_id' => $variant->id,
                        'size_id' => $size->id,
                        'stock_quantity' => $sizeData['stock_quantity'],
                        'price' => $sizeData['price'],
                    ]);
                }

                if ($request->hasFile("variants.$variantIndex.images")) {
                    foreach ($request->file("variants.$variantIndex.images") as $image) {
                        $path = $image->store('images', 'public');
                        $storagePath = Storage::url($path);

                        $imageModel = Image::create([
                            'variant_id' => $variant->id,
                            'url' => Storage::url($path),
                        ]);

                        // Liên kết hình ảnh với biến thể
                        $variant->images()->attach($imageModel->id);


                        if ($firstImagePath === null) {
                            $firstImagePath = $storagePath; // Lưu đường dẫn của hình ảnh đầu tiên
                        }
                    }
                }
            }

            if ($firstImagePath) {
                $product->image = $firstImagePath;
                $product->save();
            }

            DB::commit();

            return response()->json($product->load('variants.sizes', 'variants.images'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create product', 'details' => $e->getMessage()], 500);
        }
    }

}
