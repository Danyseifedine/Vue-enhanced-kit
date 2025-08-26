<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\BaseController;
use App\Navigation\SuperAdminPath;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends BaseController
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function index(Request $request)
    {
        $query = $this->userRepository->getBaseQuery();
        $config = $this->userRepository->getDataTableConfig();

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
            $this->userRepository->toggleStatus($user);

            $status = $user->is_active ? 'activated' : 'deactivated';
            $message = "User '{$user->name}' has been {$status} successfully.";

            return $this->successWithToast($message, 'User ' . ucfirst($status));
        } catch (\Exception $e) {
            return $this->errorWithToast('Failed to update user status. Please try again.');
        }
    }
}
