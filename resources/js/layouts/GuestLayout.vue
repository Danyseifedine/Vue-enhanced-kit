<script setup lang="ts">
import GuestLayout from '@/layouts/auth/AuthSimpleLayout.vue';

defineProps<{
    title?: string;
    description?: string;
    showLogo?: boolean;
}>();
</script>

<template>
    <GuestLayout :title="title" :description="description" :show-logo="showLogo">
        <slot />
    </GuestLayout>
</template>
