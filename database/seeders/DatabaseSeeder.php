<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $adminPermission = Permission::create(['name' => 'view-dashboard']);
        $userPermission = Permission::create(['name' => 'x-dashboard']);

        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        $adminRole->givePermissionTo($adminPermission);
        $userRole->givePermissionTo($userPermission);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 's@s.com',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now(),
        ])->assignRole($adminRole);
    }
}
