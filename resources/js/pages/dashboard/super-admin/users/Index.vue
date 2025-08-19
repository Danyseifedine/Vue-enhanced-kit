<script setup lang="ts">
import { type BreadcrumbItem } from '@core/types';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import DataTable from './DataTable.vue';
import { columns, type User } from './columns';

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        role?: string;
        sort?: string;
        direction?: string;
        per_page?: number;
    };
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: route('super-admin.users.index'),
    },
];
</script>

<template>
    <Head title="Users" />

    <AdminLayout :breadcrumbs="breadcrumbs">
        <div class="p-4 space-y-6 py-4">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-semibold">Users</h1>
                    <p class="text-muted-foreground">Manage your users and their roles.</p>
                </div>
            </div>

            <div class="">
                <DataTable 
                    :data="users.data" 
                    :columns="columns" 
                    :pagination="users"
                    :filters="filters"
                />
            </div>
        </div>
    </AdminLayout>
</template>
