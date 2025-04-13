<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { SIDEBAR_TITLE, SIDEBAR_TITLE_EXIST } from '@/pages/dashboard/env/sidebarConfig';
</script>

<template>
    <div class="flex aspect-square size-8 items-center justify-center rounded-md">
        <AppLogoIcon class="size-5 fill-current text-white dark:text-black" />
    </div>
    <div v-if="SIDEBAR_TITLE_EXIST">
        <div class="ml-1 grid flex-1 text-left text-sm">
            <span class="mb-0.5 truncate font-semibold leading-none">{{ SIDEBAR_TITLE }}</span>
        </div>
    </div>
</template>
