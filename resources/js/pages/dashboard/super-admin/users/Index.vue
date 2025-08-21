<script setup lang="ts">
import DataTable from '@/common/components/datatable/Datatable.vue';
import BaseButton from '@/common/components/form/BaseButton.vue';
import { BreadcrumbItem } from '@core/types';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import { Plus } from 'lucide-vue-next';
import type { User } from './type';
import { userColumns } from './userColumns';

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
        sort?: string;
        direction?: string;
        per_page?: number;
    };
}

const props = defineProps<Props>();

// Configure DataTable
const tableConfig = {
    searchable: true,
    searchPlaceholder: 'Search users...',
    selectable: true,
    columnVisibility: true,
    perPageSelector: true,
    perPageOptions: [10, 25, 50, 100],
    serverSide: true,
    pagination: props.users,
    filters: {
        ...props.filters,
        direction: props.filters.direction as 'asc' | 'desc' | undefined,
    },
    routeName: 'super-admin.users.index',
};

// Handle events
const handleSelectionChange = (users: User[]) => {
    console.log('Selected:', users);
};

const handleRowClick = (user: User) => {
    console.log('Clicked:', user);
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: route('super-admin.users.index'),
    },
];
</script>

<template>
    <AdminLayout :breadcrumbs="breadcrumbs">
        <Head title="Users" />

        <div class="p-4 py-10">
            <div class="mb-6 flex items-center justify-between">
                <h1 class="text-3xl font-bold">Users</h1>
                <BaseButton variant="outline">
                    <Plus class="mr-2 h-4 w-4" />
                    Add User
                </BaseButton>
            </div>

            <DataTable
                :columns="userColumns"
                :data="users.data"
                :config="tableConfig"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick"
            >
                <template #toolbar="{ table }">
                    <Button v-if="table.getFilteredSelectedRowModel().rows.length > 0" variant="destructive" size="sm">
                        Delete ({{ table.getFilteredSelectedRowModel().rows.length }})
                    </Button>
                </template>
            </DataTable>
        </div>
    </AdminLayout>
</template>
