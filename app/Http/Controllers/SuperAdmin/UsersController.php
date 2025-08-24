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
        $query = User::select('id', 'name', 'email', 'is_active', 'email_verified_at', 'created_at')->with('roles', 'media');
        // Define DataTable configuration
        $searchColumns = ['name', 'email'];
        $allowedSorts = ['name', 'email', 'created_at'];
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

    public function toggleStatus(User $user)
    {
        try {
            $user->update(['is_active' => !$user->is_active]);

            $status = $user->is_active ? 'activated' : 'deactivated';
            $message = "User '{$user->name}' has been {$status} successfully.";

            return $this->successWithToast($message, 'User ' . ucfirst($status));
        } catch (\Exception $e) {
            return $this->errorWithToast('Failed to update user status. Please try again.');
        }
    }
}
