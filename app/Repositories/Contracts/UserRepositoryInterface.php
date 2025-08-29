<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

interface UserRepositoryInterface
{
    /**
     * Get base query for users with relationships
     *
     * @return Builder
     */
    public function getBaseQuery(): Builder;

    /**
     * Get DataTable configuration
     *
     * @return array
     */
    public function getDataTableConfig(): array;

    /**
     * Toggle user active status
     *
     * @param User $user
     * @return bool
     */
    public function toggleStatus(User $user): bool;

    /**
     * Find user by ID
     *
     * @param int $id
     * @return User|null
     */
    public function findById(int $id): ?User;

    /**
     * Update user data
     *
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool;
}
