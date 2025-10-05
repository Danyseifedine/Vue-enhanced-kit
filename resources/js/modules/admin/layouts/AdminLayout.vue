<script setup lang="ts">
import { useDashboardConfig } from '@/core/composables/useDashboardConfig';
import type { BreadcrumbItemType } from '@/core/types';
import { adminDashboardConfig } from '@/modules/admin/config/admin.config';
import AuthLayout from '@shared/layouts/app/AppSidebarLayout.vue';

// Import admin-specific styles (PrimeVue overrides, etc.)
import '../../../../css/dashboard/inputs.css';

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
