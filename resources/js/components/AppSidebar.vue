<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SIDEBAR_DIRECTION, SIDEBAR_FOOTER_ITEMS, SIDEBAR_MAIN_ITEMS, SIDEBAR_VARIANTS } from '@/pages/dashboard/env/sidebarConfig';
import { Link } from '@inertiajs/vue3';
import AppLogo from './AppLogo.vue';
</script>

<template>
    <Sidebar :side="SIDEBAR_DIRECTION" collapsible="icon" :variant="SIDEBAR_VARIANTS">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('dashboard')" class="flex items-center justify-center">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="SIDEBAR_MAIN_ITEMS" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="SIDEBAR_FOOTER_ITEMS" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>

<style scoped>
/* RTL specific adjustments */
:root[dir='rtl'] .sidebar-menu-button {
    text-align: right;
}

:root[dir='rtl'] .flex.items-center.gap-2 {
    flex-direction: row-reverse;
    justify-content: flex-start;
}

:root[dir='rtl'] .ml-auto {
    margin-left: 0;
    margin-right: auto;
}
</style>
