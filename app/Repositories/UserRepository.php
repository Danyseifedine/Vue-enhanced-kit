<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get base query for users with relationships
     * This query will be used by the HasDataTable trait
     *
     * @uses HasDataTable trait
     *
     * @return Builder
     */
    public function getBaseQuery(): Builder
    {
        return User::select('id', 'name', 'email', 'is_active', 'email_verified_at', 'created_at')
            ->with('roles');
    }

    /**
     * Get DataTable configuration
     */
    public function getDataTableConfig(): array
    {
        return [
            'searchColumns' => ['name', 'email'],
            'allowedSorts' => ['name', 'email', 'created_at'],
            'allowedFilters' => [
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
            ],
        ];
    }

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user): bool
    {
        return $user->update(['is_active' => !$user->is_active]);
    }

    /**
     * Find user by ID
     */
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Update user data
     */
    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }
}
