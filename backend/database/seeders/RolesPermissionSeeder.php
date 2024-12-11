<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Permissions
        Permission::create(['name' => 'edit movies']);
        Permission::create(['name' => 'delete movies']);
        Permission::create(['name' => 'publish movies']);
        Permission::create(['name' => 'book tickets']);
    
        // Create Roles and Assign Permissions
        $admin = Role::create(['name' => 'admin']);
        $editor = Role::create(['name' => 'editor']);
        $user = Role::create(['name' => 'user']);
    
        $admin->givePermissionTo(['edit movies', 'delete movies', 'publish movies']);
        $editor->givePermissionTo(['edit movies', 'publish movies']);
        $user->givePermissionTo(['book tickets']);
    }
}
