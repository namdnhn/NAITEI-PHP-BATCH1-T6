<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    // Get all order items
    public function index()
    {
        $orderItems = OrderItem::with('order', 'productVariantSize')->get();
        return response()->json($orderItems);
    }

    // Get a single order item
    public function show($id)
    {
        $orderItem = OrderItem::with('order', 'productVariantSize')->find($id);
        if ($orderItem) {
            return response()->json($orderItem);
        } else {
            return response()->json(['message' => 'Order item not found'], 404);
        }
    }

    // Create a new order item
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_variant_size_id' => 'required|exists:product_variant_sizes,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $orderItem = OrderItem::create($validatedData);
        return response()->json($orderItem, 201);
    }

    // Update an existing order item
    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::find($id);
        if ($orderItem) {
            $validatedData = $request->validate([
                'order_id' => 'sometimes|required|exists:orders,id',
                'product_variant_size_id' => 'sometimes|required|exists:product_variant_sizes,id',
                'quantity' => 'sometimes|required|integer|min:1',
                'price' => 'sometimes|required|numeric|min:0',
            ]);

            $orderItem->update($validatedData);
            return response()->json($orderItem);
        } else {
            return response()->json(['message' => 'Order item not found'], 404);
        }
    }

    // Delete an order item
    public function destroy($id)
    {
        $orderItem = OrderItem::find($id);
        if ($orderItem) {
            $orderItem->delete();
            return response()->json(['message' => 'Order item deleted successfully']);
        } else {
            return response()->json(['message' => 'Order item not found'], 404);
        }
    }
}
