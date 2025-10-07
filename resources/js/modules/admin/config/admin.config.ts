import type { DashboardConfig } from '../../../core/types/dashboardTypes';
import type { NavItem } from "@/core/types";
import {
    BookOpen,
    LayoutGrid,
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
        sidebarTitle: 'Dany Seifeddine',
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
