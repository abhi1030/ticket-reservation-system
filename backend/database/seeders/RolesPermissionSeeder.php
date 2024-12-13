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
        // Define roles
        $roles = ['admin', 'editor', 'user'];

        // Create roles
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }
    
        // Define Permissions
        $permissions = [
            'edit movies',
            'delete movies',
            'publish movies',
            'book tickets',
            'view performance'
        ];

        // Create Permissions
        foreach($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->syncPermissions($permissions); // Assign all permissions to Admin
        }
    
        // Assign permissions to editor role
        $editorPermissions = ['edit movies', 'publish movies', 'view performance'];
        $editorRole = Role::where('name', 'editor')->first();
        if ($editorRole) {
            $editorRole->syncPermissions($editorPermissions);
        }

        // Assign permissions to user role
        $userPermissions = ['book tickets'];
        $userRole = Role::where('name', 'user')->first();
        if ($userRole) {
            $userRole->syncPermissions($userPermissions);
        }

    }
}
