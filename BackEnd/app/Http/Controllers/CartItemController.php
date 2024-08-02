<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    // Get all cart items
    public function index()
    {
        $cartItems = CartItem::all();
        return response()->json($cartItems);
    }

    // Get a single cart item
    public function show($id)
    {
        $cartItem = CartItem::with('cart', 'productVariantSize')->find($id);
        if ($cartItem) {
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    // Create a new cart item
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_variant_size_id' => 'required|exists:product_variant_sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::create($validatedData);
        return response()->json($cartItem, 201);
    }

    // Update an existing cart item
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $validatedData = $request->validate([
                'cart_id' => 'sometimes|required|exists:carts,id',
                'product_variant_size_id' => 'sometimes|required|exists:product_variant_sizes,id',
                'quantity' => 'sometimes|required|integer|min:1',
            ]);

            $cartItem->update($validatedData);
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    // Delete a cart item
    public function destroy($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted successfully']);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }
}
