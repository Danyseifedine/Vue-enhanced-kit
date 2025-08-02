export { adminDashboardConfig } from './admin.config';
export type { DashboardConfig, LayoutConfig, NavigationConfig, RouteConfig, DashboardType } from './types';

// Registry for all dashboard configurations
export const dashboardRegistry = {
    admin: () => import('./admin.config').then(m => m.adminDashboardConfig),
    // Future dashboard configs can be added here
    // user: () => import('./user.config').then(m => m.userDashboardConfig),
    // guest: () => import('./guest.config').then(m => m.guestDashboardConfig),
} as const;
