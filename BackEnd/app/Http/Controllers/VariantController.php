<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variant;

class VariantController extends Controller
{
    public function index(Product $productId)
    {
        return $productId->load('variants.sizes', 'variants.images');
    }
    
}
