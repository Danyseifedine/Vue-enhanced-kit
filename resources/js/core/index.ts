// Core Framework Exports - Everything needed across the application

// Layout System
export { useGlobalLayoutStore, useGlobalLayoutRouteStore } from './stores/layout';
export type { LayoutInterface, LayoutRouteInterface } from './stores/layout.types';

// Dashboard Configuration System
export { useDashboardConfig } from './composables/useDashboardConfig';
export { dashboardRegistry } from './config/dashboards';
export type { DashboardConfig, LayoutConfig, NavigationConfig, RouteConfig } from './config/dashboards/types';

// Core Composables
export { default as useAppearance } from './composables/useAppearance';
export { default as useInitials } from './composables/useInitials';

// Core Layouts
export { default as GuestLayout } from './layouts/GuestLayout.vue';
export { default as AppSidebarLayout } from './layouts/app/AppSidebarLayout.vue';
export { default as AppHeaderLayout } from './layouts/app/AppHeaderLayout.vue';

// Utilities
export * from './utils/utils';

// Types
export * from './types';