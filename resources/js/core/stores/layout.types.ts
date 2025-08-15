import type { NavItem } from "@/core/types";

export interface LayoutInterface {
    containerVariant: 'sidebar' | 'header';
    sidebarDirection: 'left' | 'right';
    sidebarVariant: 'inset' | 'floating' | 'sidebar';
    sidebarMainItems: NavItem[];
    sidebarFooterItems: NavItem[];
    sidebarCollapseButton: boolean;
    navbarAppearanceButton: boolean;
    navbarLogoutButton: boolean;
    navbarSettingsButton: boolean;
    navbarLanguageDropdown: boolean;
    sidebarTitleExist: boolean;
    sidebarTitle: string;
    sidebarPadding: string;
    sidebarNeonBorderColor: string;
    sidebarSubmenuStyle: 'tree' | 'bullet' | 'glass' | 'neon' | 'minimal';
}

export interface LayoutRouteInterface {
    logoRedirectPath: any;
    settingsPath: any;
}
