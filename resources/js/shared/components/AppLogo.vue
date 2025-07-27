<script setup lang="ts">
import AppLogoIcon from '@components/AppLogoIcon.vue';
import { useGlobalLayoutStore } from '@stores/global/layoutStore';

const globalLayoutStore = useGlobalLayoutStore();
</script>

<template>
    <div class="flex aspect-square size-8 items-center justify-center rounded-md">
        <AppLogoIcon class="size-5 fill-current text-white dark:text-black" />
    </div>
    <div v-if="globalLayoutStore.sidebarTitleExist">
        <div class="ml-1 grid flex-1 text-left text-sm">
            <span class="mb-0.5 truncate font-semibold leading-none">{{ globalLayoutStore.sidebarTitle }}</span>
        </div>
    </div>
</template>
