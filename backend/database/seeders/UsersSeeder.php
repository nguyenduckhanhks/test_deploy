<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
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
        DB::table('users')->insert([
            [
                'username' => 'user1',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'email' => 'user1@gmail.com',
                'type' => 1,
                'is_delete' => 0
            ],
            [
                'username' => 'admin',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'email' => 'admin@gmail.com',
                'type' => 2,
                'is_delete' => 0
            ]
        ]);
    }
}
