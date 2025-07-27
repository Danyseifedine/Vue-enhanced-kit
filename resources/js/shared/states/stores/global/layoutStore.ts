import { defineStore } from 'pinia';
import type { LayoutInterface, LayoutRouteInterface } from './layoutInterface';
import type { NavItem } from '@/shared/types';

export const useGlobalLayoutStore = defineStore('globalLayout', {
    state: (): LayoutInterface => ({
        containerVariant: 'sidebar',
        sidebarDirection: 'left',
        sidebarVariant: 'inset',
        sidebarMainItems: [],
        sidebarFooterItems: [],
        sidebarCollapseButton: true,
        navbarAppearanceButton: true,
        navbarLogoutButton: true,
        navbarSettingsButton: true,
        sidebarTitleExist: true,
        sidebarTitle: '',
        sidebarPadding: '',
        sidebarNeonBorderColor: '',
        sidebarSubmenuStyle: 'tree',
    }),

    actions: {
        setContainerVariant(variant: 'sidebar' | 'header') {
            this.containerVariant = variant;
        },
        setSidebarDirection(direction: 'left' | 'right') {
            this.sidebarDirection = direction;
        },
        setSidebarVariant(variant: 'inset' | 'floating' | 'sidebar') {
            this.sidebarVariant = variant;
        },
        setSidebarMainItems(items: NavItem[]) {
            this.sidebarMainItems = items;
        },
        setSidebarFooterItems(items: NavItem[]) {
            this.sidebarFooterItems = items;
        },
        setSidebarCollapseButton(collapseButton: boolean) {
            this.sidebarCollapseButton = collapseButton;
        },
        setNavbarAppearanceButton(appearanceButton: boolean) {
            this.navbarAppearanceButton = appearanceButton;
        },
        setNavbarLogoutButton(logoutButton: boolean) {
            this.navbarLogoutButton = logoutButton;
        },
        setNavbarSettingsButton(settingsButton: boolean) {
            this.navbarSettingsButton = settingsButton;
        },
        setSidebarTitleExist(titleExist: boolean) {
            this.sidebarTitleExist = titleExist;
        },
        setSidebarTitle(title: string) {
            this.sidebarTitle = title;
        },
        setSidebarPadding(padding: string) {
            this.sidebarPadding = padding;
        },
        setSidebarNeonBorderColor(borderColor: string) {
            this.sidebarNeonBorderColor = borderColor;
        },
        setSidebarSubmenuStyle(style: 'tree' | 'bullet' | 'glass' | 'neon' | 'minimal') {
            this.sidebarSubmenuStyle = style;
        },
    },
});

export const useGlobalLayoutRouteStore = defineStore('globalLayoutRoute', {
    state: (): LayoutRouteInterface => ({
        logoRedirectPath: null,
        settingsPath: null,
    }),

    actions: {
        setLogoRedirectPath(path: any) {
            this.logoRedirectPath = path;
        },
        setSettingsPath(path: any) {
            this.settingsPath = path;
        },
    },
});
