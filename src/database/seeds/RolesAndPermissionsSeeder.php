<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'add']);
        Permission::create(['name' => 'edit']);
        Permission::create(['name' => 'delete']);

        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::create(['name' => 'User', 'guard_name' => 'api']);
        $role->givePermissionTo('edit');


        $role = Role::create(['name' => 'Admin', 'guard_name' => 'api']);
        $role->givePermissionTo(Permission::all());

        $user = User::create([
            'name' => 'Admin Fligno',
            'email' => 'admin@fligno.com',
            'password' => bcrypt('Default123')
        ]);

        $user->assignRole('Admin');
    }
}
