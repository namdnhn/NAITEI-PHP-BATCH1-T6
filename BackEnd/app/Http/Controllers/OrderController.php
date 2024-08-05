<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Get all orders
    public function index()
    {
        $orders = Order::with('items')->get();
        return response()->json($orders);
    }

    // Get a single order
    public function show($id)
    {
        $order = Order::with('items')->find($id);
        if ($order) {
            return response()->json($order);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    // Create a new order
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_price' => 'required|numeric',
        ]);

        $order = Order::create($validatedData);
        return response()->json($order, 201);
    }

    // Update an existing order
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order) {
            $validatedData = $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
                'status' => 'sometimes|required|string',
                'total_price' => 'sometimes|required|numeric',
            ]);

            $order->update($validatedData);
            return response()->json($order);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    // Delete an order
    public function destroy($id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->delete();
            return response()->json(['message' => 'Order deleted successfully']);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }
}
