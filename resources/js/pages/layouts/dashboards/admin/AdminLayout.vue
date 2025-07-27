<script setup lang="ts">
import IndexController from '@/actions/App/Http/Controllers/Admin/IndexController';
import ProfileController from '@/actions/App/Http/Controllers/Admin/Settings/ProfileController';
import AuthLayout from '@/pages/layouts/app/AppSidebarLayout.vue';
import { useGlobalLayoutRouteStore, useGlobalLayoutStore } from '@/shared/states/stores/global/layoutStore';
import type { BreadcrumbItemType } from '@/shared/types';

import {
    ADMIN_CONTAINER_VARIANT,
    ADMIN_NAVBAR_APPEAREANCE_BUTTON,
    ADMIN_NAVBAR_LOGOUT_BUTTON,
    ADMIN_NAVBAR_SETTINGS_BUTTON,
    ADMIN_SIDEBAR_COLLAPSE_BUTTON,
} from '@/pages/dashboard/admin/env/navConfig';

import {
    ADMIN_SIDEBAR_DIRECTION,
    ADMIN_SIDEBAR_FOOTER_ITEMS,
    ADMIN_SIDEBAR_MAIN_ITEMS,
    ADMIN_SIDEBAR_NEON_BORDER_COLOR,
    ADMIN_SIDEBAR_PADDING,
    ADMIN_SIDEBAR_SUBMENU_STYLE,
    ADMIN_SIDEBAR_TITLE,
    ADMIN_SIDEBAR_TITLE_EXIST,
    ADMIN_SIDEBAR_VARIANTS,
} from '@/pages/dashboard/admin/env/sidebarConfig';


interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const globalLayoutStore = useGlobalLayoutStore();

globalLayoutStore.setContainerVariant(ADMIN_CONTAINER_VARIANT);
globalLayoutStore.setSidebarDirection(ADMIN_SIDEBAR_DIRECTION);
globalLayoutStore.setSidebarVariant(ADMIN_SIDEBAR_VARIANTS);
globalLayoutStore.setSidebarMainItems(ADMIN_SIDEBAR_MAIN_ITEMS);
globalLayoutStore.setSidebarFooterItems(ADMIN_SIDEBAR_FOOTER_ITEMS);
globalLayoutStore.setSidebarCollapseButton(ADMIN_SIDEBAR_COLLAPSE_BUTTON);
globalLayoutStore.setNavbarAppearanceButton(ADMIN_NAVBAR_APPEAREANCE_BUTTON);
globalLayoutStore.setNavbarLogoutButton(ADMIN_NAVBAR_LOGOUT_BUTTON);
globalLayoutStore.setNavbarSettingsButton(ADMIN_NAVBAR_SETTINGS_BUTTON);
globalLayoutStore.setSidebarTitleExist(ADMIN_SIDEBAR_TITLE_EXIST);
globalLayoutStore.setSidebarTitle(ADMIN_SIDEBAR_TITLE);
globalLayoutStore.setSidebarPadding(ADMIN_SIDEBAR_PADDING);
globalLayoutStore.setSidebarNeonBorderColor(ADMIN_SIDEBAR_NEON_BORDER_COLOR);
globalLayoutStore.setSidebarSubmenuStyle(ADMIN_SIDEBAR_SUBMENU_STYLE);

const globalLayoutRouteStore = useGlobalLayoutRouteStore();
globalLayoutRouteStore.setLogoRedirectPath(IndexController.index().url);
globalLayoutRouteStore.setSettingsPath(ProfileController.edit().url);
</script>

<template>
    <AuthLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AuthLayout>
</template>
