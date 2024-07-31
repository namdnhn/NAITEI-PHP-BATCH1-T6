<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UpdateProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        // Danh sách hình ảnh
        $images = [
            'STEVEMADDEN_MENS_AALON_BLACK-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_AALON_TAN-LEATHER-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_DAYMIN_BLACK-PATENT_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_DAYMIN_BROWN-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_DAYMIN_TAN-LEATHER_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_FREDERICK_TAN-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_JAYSHAN_BLACK-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_MENS_NATAN_BLACK-WHITE-MULTI_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_SHOES_ZEV_BLACK-BOX_01-ezgif.com-webp-to-png-converter.png',
            'STEVEMADDEN_SHOES_ZEV_BURGANDY_01-ezgif.com-webp-to-png-converter.png',
        ];

        foreach ($images as $index => $image) {
            DB::table('products')->where('id', $index + 1)->update([
                'image' => $image,
            ]);
        }
    }
}
