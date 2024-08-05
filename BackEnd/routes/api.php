<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\VariantController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('products', ProductController::class);
Route::apiResource('users', UserController::class);
// Route::apiResource('carts', CartController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('cart-items', CartItemController::class);
Route::get('products/{productId}/variants', [VariantController::class, 'index']);
Route::post('add-to-cart', [CartItemController::class, 'add_item_to_cart']);
