import type { DashboardConfig } from '../../../core/types/dashboardTypes';
import type { NavItem } from "@/core/types";
import {
    BookOpen,
    Key,
    LayoutGrid,
    Shield,
    Users,
} from "lucide-vue-next";

const getAdminSidebarMainItems = (): NavItem[] => [
    {
        title: 'Dashboard',
        href: route('super-admin.dashboard'),
        icon: LayoutGrid,
        permissions: ['access-super-admin-dashboard'],
    },
    {
        title: 'Users',
        href: route('super-admin.users.index'),
        icon: Users,
        permissions: ['access-super-admin-dashboard'],
    },
    {

        title: 'Privileges',
        isSection: true,
    },
    {
        title: 'Roles',
        href: route('super-admin.roles.index'),
        icon: Shield,
        permissions: ['access-super-admin-role'],
    },
    {
        title: 'Permissions',
        href: route('super-admin.permissions.index'),
        icon: Key,
        permissions: ['access-super-admin-permission'],
    },
    // {
    //     title: 'Products',
    //     href: route('super-admin.products.create'),
    //     icon: Package,
    //     permissions: ['access-super-admin-dashboard'],
    // },
];

const getAdminSidebarFooterItems = (): NavItem[] => [
    {
        title: 'Documentation',
        href: route('super-admin.documentation'),
        icon: BookOpen,
    },
];

export const adminDashboardConfig: DashboardConfig = {
    id: 'admin',
    name: 'Admin Dashboard',
    layout: {
        containerVariant: 'sidebar',
        sidebarDirection: document.documentElement.dir === 'rtl' ? "right" : "left",
        sidebarVariant: 'inset',
        sidebarCollapseButton: true,
        navbarAppearanceButton: true,
        navbarLogoutButton: true,
        navbarSettingsButton: true,
        navbarLanguageDropdown: false,
        sidebarTitleExist: true,
        sidebarTitle: 'Dashboard',
        sidebarPadding: 'py-5',
        sidebarNeonBorderColor: '#fff',
        sidebarSubmenuStyle: 'tree',
    },
    navigation: {
        mainItems: getAdminSidebarMainItems(),
        footerItems: getAdminSidebarFooterItems(),
    },
    routes: {
        logoRedirect: route('super-admin.dashboard'),
        settings: route('super-admin.settings.profile.edit'),
    },
};
