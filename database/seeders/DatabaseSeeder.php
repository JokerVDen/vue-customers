<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\Customer::factory(50)->create();

         \App\Models\User::factory()->create([
             'name' => 'Test',
             'email' => 'test@te.te',
             'password' => '123456'
         ]);
    }
}
