<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // password: 1
        // type: 1-common, 2-admin
        // is_delete: 0-no, 1-yes
        DB::table('socials')->insert([
            [
                'user_id' => 1
            ]
        ]);
    }
}
