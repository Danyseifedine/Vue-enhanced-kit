<script setup lang="ts">
import AppContent from '@/core/components/AppContent.vue';
import AppHeader from '@/core/components/AppHeader.vue';
import AppShell from '@/core/components/AppShell.vue';
import type { BreadcrumbItemType } from '@/core/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppShell class="flex-col">
        <AppHeader :breadcrumbs="breadcrumbs" />
        <AppContent>
            <slot />
        </AppContent>
    </AppShell>
</template>
