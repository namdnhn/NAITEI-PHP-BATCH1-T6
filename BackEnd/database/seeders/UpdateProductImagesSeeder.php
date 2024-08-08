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
            'images/STEVEMADDEN_MENS_AALON_TAN-LEATHER.png',
            'images/STEVEMADDEN_MENS_CAYCE_BLACK-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_DAYMIN_BLACK-PATENT_01.png',
            'images/STEVEMADDEN_MENS_DAYMIN_BROWN-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_DAYMIN_TAN-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_HADAR_SILVER_01.png',
            'images/STEVEMADDEN_MENS_JAMONE_TAN_01.png',
            'images/STEVEMADDEN_MENS_JARRIS_BLACK-LEATHER.png',
            'images/STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.png',
            'images/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_KOLEMAN_BLACK-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_KOLEMAN_TAN-LEATHER_01.png',
            'images/STEVEMADDEN_MENS_NATAN_BROWN-MULTI_01.png',
            'images/STEVEMADDEN_MENS_ONDRE_SAND.png',
            'images/STEVEMADDEN_MENS_ONDRE_TAN.png',
        ];

        $shoes = Product::all();

        foreach ($shoes as $shoe) {
            $shoe->image = $images[array_rand($images)];
            $shoe->save();
        }
    }
}
