<?php

namespace App\Http\Controllers;

use App\Models\ImagesVariant;
use App\Models\Product;
use App\Models\Variant;
use App\Models\Size;
use App\Models\ProductVariantSize;
use App\Models\Image;
use App\Http\Controllers\VariantController;
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
                        $img = Image::create([
                            'variant_id' => $variant->id,
                            'url' => $path,
                        ]);
                        ImagesVariant::create([
                            'variant_id' => $variant->id,
                            'image_id' => $img->id,
                        ]);
                    }
                }
            }

            DB::commit();

            $response = $product->load('variants.sizes', 'variants.images');
            foreach ($response->variants as $variant) {
                foreach ($variant->images as $image) {
                    $image->url = config('filesystems.disks.public.url') . '/' . $image->url;
                }
            }

            return response()->json($response, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create product', 'details' => $e->getMessage()], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'variants' => 'required|array',
            'variants.*.id' => 'nullable|exists:variants,id',
            'variants.*.name' => 'required|string',
            'variants.*.sizes' => 'required|array',
            'variants.*.sizes.*.id' => 'nullable|exists:sizes,id',
            'variants.*.sizes.*.name' => 'required|string',
            'variants.*.sizes.*.stock_quantity' => 'required|integer',
            'variants.*.sizes.*.price' => 'required|numeric',
            'variants.*.images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::findOrFail($id);
            $product->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category_id' => $request->input('category_id'),
            ]);

            $existingVariantIds = $product->variants->pluck('id')->toArray();
            $newVariantIds = [];

            foreach ($request->input('variants') as $variantIndex => $variantData) {
                $variant = Variant::updateOrCreate(
                    ['id' => $variantData['id'] ?? null, 'product_id' => $product->id],
                    ['name' => $variantData['name']]
                );
                $newVariantIds[] = $variant->id;

                $existingSizeIds = $variant->sizes->pluck('id')->toArray();
                $newSizeIds = [];

                foreach ($variantData['sizes'] as $sizeData) {
                    $size = Size::firstOrCreate(['name' => $sizeData['name']]);
                    ProductVariantSize::updateOrCreate(
                        ['variant_id' => $variant->id, 'size_id' => $size->id],
                        ['stock_quantity' => $sizeData['stock_quantity'], 'price' => $sizeData['price']]
                    );
                    $newSizeIds[] = $size->id;
                }

                foreach (array_diff($existingSizeIds, $newSizeIds) as $sizeId) {
                    ProductVariantSize::where('variant_id', $variant->id)->where('size_id', $sizeId)->delete();
                }

                // Handle images
                $existingImageIds = $variant->images->pluck('id')->toArray();
                $newImageIds = $variantData['images'] ?? [];

                // Delete images that are no longer in the request
                foreach ($existingImageIds as $existingImageId) {
                    if (!in_array($existingImageId, $newImageIds)) {
                        $image = Image::find($existingImageId);
                        Storage::disk('public')->delete($image->url);
                        $image->delete();
                    }
                }

                // Add new images
                if ($request->hasFile("variants.$variantIndex.images")) {
                    foreach ($request->file("variants.$variantIndex.images") as $image) {
                        $path = $image->store('images', 'public');
                        Image::create([
                            'variant_id' => $variant->id,
                            'url' => $path,
                        ]);
                    }
                }

            }

            foreach (array_diff($existingVariantIds, $newVariantIds) as $variantId) {
                $variantController = new VariantController();
                $variantController->delete(Variant::find($variantId));
            }

            DB::commit();

            $response = $product->load('variants.sizes', 'variants.images');
            foreach ($response->variants as $variant) {
                foreach ($variant->images as $image) {
                    $image->url = config('filesystems.disks.public.url') . '/' . $image->url;
                }
            }
            return response()->json($response, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update product', 'details' => $e->getMessage()], 500);
        }
    }
}
