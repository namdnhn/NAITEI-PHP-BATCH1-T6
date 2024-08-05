<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('products', ProductController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('comments', CommentController::class);
Route::get('products/{productId}/variants', [VariantController::class, 'index']);
Route::post('add-to-cart', [CartItemController::class, 'add_item_to_cart']);
Route::apiResource('orders', OrderController::class);
Route::apiResource('order-items', OrderItemController::class);

Route::get('users/{email}/{password}', [UserController::class, 'findUserByEmailAndPassword']);

Route::middleware('auth:sanctum')->get('/check-admin', [UserController::class, 'is_admin']);
Route::get('cart-items', [CartItemController::class, 'get_cart_items']);
