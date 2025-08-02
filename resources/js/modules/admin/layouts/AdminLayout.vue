<script setup lang="ts">
import AuthLayout from '@/core/layouts/app/AppSidebarLayout.vue';
import { useDashboardConfig } from '@/core/composables/useDashboardConfig';
import { adminDashboardConfig } from '@/core/config/dashboards/admin.config';
import type { BreadcrumbItemType } from '@/core/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

// Apply all admin dashboard configuration in one line
useDashboardConfig(adminDashboardConfig);
</script>

<template>
    <AuthLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AuthLayout>
</template>
