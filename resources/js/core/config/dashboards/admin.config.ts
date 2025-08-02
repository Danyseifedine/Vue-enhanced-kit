import type { DashboardConfig } from './types';
import type { NavItem } from "@/core/types";
import {
    BookOpen, Folder,
    LayoutGrid
} from "lucide-vue-next";

const getAdminSidebarMainItems = (): NavItem[] => [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        isSection: true,
    },
    {
        title: 'My Projects',
        href: "#",
        icon: Folder,
        children: [
            {
                title: 'Project 1',
                href: route('admin.settings.profile.edit'),
                icon: Folder,
            },
            {
                title: 'Project 2',
                href: route('admin.settings.appearance'),
                icon: Folder,
            },
        ],
    },
    {
        title: 'Notifications',
        isSection: true,
    },
];

const getAdminSidebarFooterItems = (): NavItem[] => [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
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
        sidebarTitleExist: true,
        sidebarTitle: 'Dany Seifeddine',
        sidebarPadding: 'py-5',
        sidebarNeonBorderColor: '#d9ff00',
        sidebarSubmenuStyle: 'tree',
    },
    navigation: {
        mainItems: getAdminSidebarMainItems(),
        footerItems: getAdminSidebarFooterItems(),
    },
    routes: {
        logoRedirect: route('admin.dashboard'),
        settings: route('admin.settings.profile.edit'),
    },
};
