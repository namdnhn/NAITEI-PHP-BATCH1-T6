<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;

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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_price' => 'required|numeric',
        ]);
    
        // Tạo đơn hàng mới
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

    public function sendOrderConfirmation(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'email' => 'required|email'
        ]);
    
        $orderId = $validatedData['order_id'];
        $userEmail = $validatedData['email'];
    
        // Tìm đơn hàng cùng với các items và thông tin liên quan
        $order = Order::with('items.productVariantSize')->find($orderId);
    
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    
        // Tìm người dùng dựa trên email
        $user = User::where('email', $userEmail)->first();
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        try {
            // Gửi email xác nhận
            Mail::to($user->email)->send(new OrderConfirmationMail($order, $user));
            return response()->json(['message' => 'Order confirmation email sent successfully.'], 200);
        } catch (\Exception $e) {
            // Log lỗi và trả về phản hồi lỗi
            \Log::error('Failed to send order confirmation email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send order confirmation email.'], 500);
        }
    }
}
