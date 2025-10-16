<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [

            // ================================================
            // ---------------- Start Super Admin ---------------
            // ================================================
            // Dashboard permissions
            'access-super-admin-dashboard',

            // Profile permissions
            'update-super-admin-profile',
            'delete-super-admin-profile',
            'update-super-admin-password',

            // ================================================
            // ---------------- End Super Admin ---------------
            // ================================================
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
