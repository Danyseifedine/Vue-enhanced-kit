<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

import HeadingSmall from '@core/components/HeadingSmall.vue';
import { useAppearance } from '@core/composables/useAppearance';
import { type BreadcrumbItem } from '@core/types';
import { Monitor, Moon, Sun } from 'lucide-vue-next';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', Icon: Sun, label: 'Light' },
    { value: 'dark', Icon: Moon, label: 'Dark' },
    { value: 'system', Icon: Monitor, label: 'System' },
] as const;

import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import SettingsLayout from '@modules/admin/layouts/SettingsLayout.vue';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];
</script>

<template>
    <AdminLayout :breadcrumbs="breadcrumbItems">
        <Head title="Appearance settings" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />

                <div :class="['inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800']">
                    <button
                        v-for="{ value, Icon, label } in tabs"
                        :key="value"
                        @click="updateAppearance(value)"
                        :class="[
                            'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                            appearance === value
                                ? 'bg-white shadow-sm dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        ]"
                    >
                        <component :is="Icon" class="icon-appearance-tabs -ml-1 h-4 w-4 rtl:ml-1.5" />
                        <span class="ml-1.5 text-sm">{{ label }}</span>
                    </button>
                </div>
            </div>
        </SettingsLayout>
    </AdminLayout>
</template>
