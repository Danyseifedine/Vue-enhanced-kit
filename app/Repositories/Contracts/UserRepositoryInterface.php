<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

interface UserRepositoryInterface
{
    /**
     * Get base query for users with relationships
     */
    public function getBaseQuery(): Builder;

    /**
     * Get DataTable configuration
     */
    public function getDataTableConfig(): array;

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user): bool;

    /**
     * Find user by ID
     */
    public function findById(int $id): ?User;

    /**
     * Update user data
     */
    public function update(User $user, array $data): bool;
}
