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
        $query = User::select('id', 'name', 'email', 'is_active', 'email_verified_at', 'created_at')
            ->with(['roles:id,name', 'media:id,model_id,model_type,file_name']);
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
                if ($value === 'active') {
                    $query->where('is_active', 1);
                } else {
                    $query->where('is_active', 0);
                }
            },
            'email_verified' => function ($query, $value) {
                if ($value === 'true') {
                    $query->whereNotNull('email_verified_at');
                } else {
                    $query->whereNull('email_verified_at');
                }
            },
            'created_from' => function ($query, $value) {
                $query->whereDate('created_at', '>=', $value);
            },
            'created_to' => function ($query, $value) {
                $query->whereDate('created_at', '<=', $value);
            },
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
            'filters' => $this->getFilters(['role', 'status', 'email_verified', 'created_from', 'created_to']),
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
