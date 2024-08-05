<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CreateAdminSeeder::class);
        $this->call(UpdateProductImagesSeeder::class);
        $this->call(DatabaseSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(VariantsAndSizesSeeder::class);
    }
}
