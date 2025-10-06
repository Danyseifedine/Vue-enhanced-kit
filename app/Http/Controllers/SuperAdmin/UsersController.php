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

    public function index()
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

    public function create()
    {
        return Inertia::render(SuperAdminPath::view("users/actions/Create"));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
        ]);

        $this->userService->create($request->all());
    }

    public function edit(User $user)
    {
        $user->load('roles');
        return Inertia::render(SuperAdminPath::view("users/actions/Edit"), [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $this->userService->update($user, $request->all());
    }

    public function show(User $user)
    {
        $user->load('roles');
        return Inertia::render(SuperAdminPath::view("users/actions/Show"), [
            'user' => $user,
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
