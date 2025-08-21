<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\BaseController;
use App\Navigation\SuperAdminPath;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends BaseController
{
    public function index(Request $request)
    {
        $query = User::with('roles');

        // Define DataTable configuration
        $searchColumns = ['name', 'email'];
        $allowedSorts = ['name', 'email', 'created_at', 'updated_at'];
        $allowedFilters = [
            'role' => [
                'type' => 'relationship',
                'relationship' => 'roles',
                'relation_column' => 'name'
            ],
            'status' => function ($query, $value) {
                if ($value === 'verified') {
                    $query->whereNotNull('email_verified_at');
                } else {
                    $query->whereNull('email_verified_at');
                }
            }
        ];

        // Apply DataTable logic
        $users = $this->dataTable(
            $query,
            $searchColumns,
            $allowedSorts,
            $allowedFilters
        );

        return Inertia::render(SuperAdminPath::view("users/Index"), [
            'users' => $users,
            'filters' => $this->getFilters(['role', 'status']),
        ]);
    }
}
