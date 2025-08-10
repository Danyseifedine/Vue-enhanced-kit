import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { SharedData } from '@/core/types';

export const useGuard = () => {
    const page = usePage<SharedData>();

    // Reactive user permissions and roles
    const userPermissions = computed(() => page.props.auth?.permissions || []);
    const userRoles = computed(() => page.props.auth?.roles || []);

    /**
     * Check if user has a specific permission
     */
    const hasPermission = (permission: string): boolean => {
        return userPermissions.value.includes(permission);
    };

    /**
     * Check if user has any of the specified permissions
     */
    const hasPermissions = (permissions: string[], requireAll = false): boolean => {
        if (permissions.length === 0) return true;

        return requireAll
            ? permissions.every(permission => hasPermission(permission))
            : permissions.some(permission => hasPermission(permission));
    };

    /**
     * Check if user has a specific role
     */
    const hasRole = (role: string): boolean => {
        return userRoles.value.includes(role);
    };

    /**
     * Check if user has any of the specified roles
     */
    const hasRoles = (roles: string[], requireAll = false): boolean => {
        if (roles.length === 0) return true;

        return requireAll
            ? roles.every(role => hasRole(role))
            : roles.some(role => hasRole(role));
    };

    /**
     * Convenient aliases
     */
    const can = hasPermission;
    const cannot = (permission: string): boolean => !hasPermission(permission);
    const is = hasRole;
    const isNot = (role: string): boolean => !hasRole(role);

    return {
        // State
        userPermissions,
        userRoles,

        // Core functions
        hasPermission,
        hasPermissions,
        hasRole,
        hasRoles,

        // Aliases
        can,
        cannot,
        is,
        isNot,
    };
};
