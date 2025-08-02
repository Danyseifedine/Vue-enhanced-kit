// Module Registry - Lazy-loaded modules for scalability
// Note: Pages are located in @pages for Inertia.js compatibility
export const modules = {
    admin: {
        name: 'Admin Module',
        layouts: () => import('./admin/layouts'),
        pages: '@pages/dashboard/admin', // Inertia pages
        components: () => import('./admin/components'),
        composables: () => import('./admin/composables'),
        stores: () => import('./admin/stores'),
    },
    auth: {
        name: 'Authentication Module',
        layouts: () => import('./auth/layouts'),
        pages: '@pages/auth', // Inertia pages
        components: () => import('./auth/components'),
    },
    // Future modules can be added here
    // user: {
    //     name: 'User Module',
    //     layouts: () => import('./user/layouts'),
    //     pages: '@pages/user',
    // },
    // reporting: {
    //     name: 'Reporting Module',
    //     layouts: () => import('./reporting/layouts'),
    //     pages: '@pages/reporting',
    // },
} as const;

export type ModuleType = keyof typeof modules;