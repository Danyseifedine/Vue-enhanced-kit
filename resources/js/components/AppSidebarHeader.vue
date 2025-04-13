<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Button from '@/components/ui/button/Button.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppearance } from '@/composables/useAppearance';
import { NAVBAR_APPEAREANCE_BUTTON, NAVBAR_LOGOUT_BUTTON, NAVBAR_SETTINGS_BUTTON, SIDEBAR_COLLAPSE_BUTTON } from '@/pages/dashboard/env/navConfig';
import type { BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/vue3';
import { LogOut, Moon, Settings, Sun } from 'lucide-vue-next';

defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
}>();

const { appearance, updateAppearance } = useAppearance();

const toggleTheme = () => {
    const currentTheme = typeof appearance === 'object' && 'value' in appearance ? appearance.value : appearance;

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateAppearance(newTheme);
};
</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" v-if="SIDEBAR_COLLAPSE_BUTTON" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>
        <div class="mx-1 flex items-center justify-between gap-3">
            <Button variant="secondary" size="icon" v-if="NAVBAR_APPEAREANCE_BUTTON" class="h-8 w-8" @click="toggleTheme">
                <Sun v-if="appearance === 'dark'" class="h-4 w-4" />
                <Moon v-else class="h-4 w-4" />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <Link
                :href="route('dashboard.profile.edit')"
                class="bg-sidebar-background hover:bg-sidebar-background/80 inline-flex items-center rounded-md border border-sidebar-border/70 p-1.5 text-sm text-sidebar-foreground transition-colors"
                v-if="NAVBAR_SETTINGS_BUTTON"
                as="button"
            >
                <Settings class="h-4 w-4" />
                <span class="sr-only">Settings</span>
            </Link>
            <Link
                v-if="NAVBAR_LOGOUT_BUTTON"
                :href="route('logout')"
                method="post"
                as="button"
                class="bg-sidebar-background hover:bg-sidebar-background/80 inline-flex items-center rounded-md border border-sidebar-border/70 p-1.5 text-sm text-sidebar-foreground transition-colors"
            >
                <LogOut class="h-4 w-4" />
                <span class="sr-only">Logout</span>
            </Link>
        </div>
    </header>
</template>
