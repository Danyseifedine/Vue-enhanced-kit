<script setup lang="ts">
import AppContent from '@/core/components/AppContent.vue';
import AppShell from '@/core/components/AppShell.vue';
import AppSidebar from '@/core/components/AppSidebar.vue';
import AppSidebarHeader from '@/core/components/AppSidebarHeader.vue';
import { useGlobalLayoutStore } from '@/core/stores/layout';
import type { BreadcrumbItemType } from '@/core/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

const globalLayoutStore = useGlobalLayoutStore();

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppShell>
        <AppSidebar />
        <AppContent :variant="globalLayoutStore.containerVariant">
            <AppSidebarHeader :breadcrumbs="breadcrumbs" />
            <slot />
        </AppContent>
    </AppShell>
</template>
