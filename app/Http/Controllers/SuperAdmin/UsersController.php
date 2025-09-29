<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\BaseController;
use App\Navigation\SuperAdminPath;
use App\Models\User;
use App\Services\Core\UserService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends BaseController
{
    public function __construct(
        private UserService $userService
    ) {}

    public function index(Request $request)
    {
        $query = $this->userService->getBaseQuery();
        $config = $this->userService->getDataTableConfig();

        $users = $this->dataTable(
            $query,
            $config['searchColumns'],
            $config['allowedSorts'],
            $config['allowedFilters']
        );

        return Inertia::render(SuperAdminPath::view("users/Index"), [
            'users' => $users,
            'filters' => $this->getFilters(['role', 'status', 'email_verified', 'created_from', 'created_to']),
        ]);
    }


    public function toggleStatus(User $user)
    {
        try {
            $this->userService->toggleStatus($user);

            $status = $user->is_active ? 'activated' : 'deactivated';
            $message = "User '{$user->name}' has been {$status} successfully.";

            return $this->successWithToast($message, 'User ' . ucfirst($status));
        } catch (\Exception $e) {
            return $this->errorWithToast('Failed to update user status. Please try again.');
        }
    }
}
