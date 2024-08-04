<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class UpdateProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        // Danh sách hình ảnh
        $images = [
            'images/STEVEMADDEN_MENS_AALON_BLACK-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_AALON_TAN-LEATHER-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_DAYMIN_BLACK-PATENT_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_DAYMIN_BROWN-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_DAYMIN_TAN-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_FREDERICK_TAN-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_JAYSHAN_BLACK-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_MENS_NATAN_BLACK-WHITE-MULTI_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_SHOES_ZEV_BLACK-BOX_01-ezgif.com-webp-to-png-converter.png',
            'images/STEVEMADDEN_SHOES_ZEV_BURGANDY_01-ezgif.com-webp-to-png-converter.png',
        ];

        $shoes = Product::all();

        foreach ($shoes as $shoe) {
            $shoe->image = $images[array_rand($images)];
            $shoe->save();
        }
    }
}
