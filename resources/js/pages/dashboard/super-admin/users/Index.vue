<script setup lang="ts">
import DataTable from '@/common/components/datatable/Datatable.vue';
import BaseButton from '@/common/components/form/BaseButton.vue';
import { useFilters } from '@/core/composables/useFilters';
import { formatDateForBackend } from '@/core/utils/formatters';
import { parseDate } from '@/core/utils/parsers';
import { BreadcrumbItem } from '@core/types';
import { Head, router } from '@inertiajs/vue3';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import { Tag } from '@ui/badge';
import { Button } from '@ui/button';
import { Plus } from 'lucide-vue-next';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { watch } from 'vue';
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

// Initialize filters from URL params
const initializeFilters = () => {
    const urlFilters = props.filters as any;

    return {
        ...urlFilters,
        role: urlFilters?.role || '',
        status: urlFilters?.status || '',
        email_verified: urlFilters?.email_verified || '',
        created_from: parseDate(urlFilters?.created_from),
        created_to: parseDate(urlFilters?.created_to),
    };
};

// Use the reusable filter composable
const { localFilters, isFilteringLoading, hasActiveFilters, activeFilterCount, applyFilters, clearFilters, updateFilters } = useFilters(
    initializeFilters(),
    {
        routeName: 'super-admin.users.index',
        preserveState: false,
        preserveScroll: true,
    },
);

watch(
    () => props.filters,
    (newFilters) => {
        if (newFilters) {
            updateFilters(initializeFilters());
        }
    },
    { deep: true },
);

// Filter options
const roleOptions = [
    { name: 'Super Admin', code: 'super-admin' },
    { name: 'User', code: 'user' },
];

const statusOptions = [
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' },
];

const emailVerifiedOptions = [
    { name: 'All', code: '' },
    { name: 'Verified', code: 'true' },
    { name: 'Not Verified', code: 'false' },
];

// Custom filter logic for date formatting
const applyFiltersWithDateFormat = () => {
    // Format dates before applying filters
    if (localFilters.value.created_from) {
        localFilters.value.created_from = formatDateForBackend(localFilters.value.created_from);
    }
    if (localFilters.value.created_to) {
        localFilters.value.created_to = formatDateForBackend(localFilters.value.created_to);
    }

    applyFilters();
};

// Configure DataTable
const tableConfig = {
    searchable: true,
    searchPlaceholder: 'Search users by name or email...',
    selectable: true,
    columnVisibility: true,
    perPageSelector: true,
    perPageOptions: [10, 25, 50, 100],
    serverSide: true,
    pagination: props.users,
    filterable: true,
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
    router.get(route('super-admin.users.show', user.id));
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

        <div class="p-4">
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Users</h1>
                    <p class="mt-1 text-muted-foreground">Manage system users and their permissions</p>
                </div>
                <BaseButton variant="default" @click="() => router.get(route('super-admin.users.create'))">
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
                    <!-- Active filters display -->
                    <div v-if="hasActiveFilters" class="flex items-center gap-2">
                        <Tag :value="`${activeFilterCount} ${activeFilterCount === 1 ? 'filter' : 'filters'} active`" severity="info" />
                    </div>

                    <!-- Bulk actions -->
                    <Button v-if="table.getFilteredSelectedRowModel().rows.length > 0" variant="destructive" size="sm">
                        Delete ({{ table.getFilteredSelectedRowModel().rows.length }})
                    </Button>
                </template>

                <template #filters>
                    <div class="space-y-4">
                        <!-- Filter Grid -->
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <!-- Role Filter -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Role</label>
                                <Select
                                    v-model="localFilters.role"
                                    :options="roleOptions"
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="All Roles"
                                    class="w-full"
                                    size="small"
                                    :showClear="true"
                                    filter
                                    filterPlaceholder="Search roles..."
                                    :scrollHeight="'100px'"
                                />
                            </div>

                            <!-- Status Filter -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Status</label>
                                <Select
                                    v-model="localFilters.status"
                                    :options="statusOptions"
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="All Status"
                                    class="w-full"
                                    size="small"
                                    :showClear="true"
                                    filter
                                    filterPlaceholder="Search status..."
                                    :scrollHeight="'200px'"
                                />
                            </div>

                            <!-- Email Verified Filter -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Email Verification</label>
                                <Select
                                    v-model="localFilters.email_verified"
                                    :options="emailVerifiedOptions"
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="All"
                                    class="w-full"
                                    size="small"
                                    :showClear="true"
                                    filter
                                    filterPlaceholder="Search email verification..."
                                    :scrollHeight="'200px'"
                                />
                            </div>

                            <!-- Created From Date -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Created From</label>
                                <DatePicker
                                    v-model="localFilters.created_from"
                                    placeholder="Select Created From"
                                    size="small"
                                    showIcon
                                    fluid
                                    iconDisplay="input"
                                    dateFormat="yy-mm-dd"
                                />
                            </div>

                            <!-- Created To Date -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Created To</label>
                                <DatePicker
                                    v-model="localFilters.created_to"
                                    placeholder="Select Created To"
                                    size="small"
                                    showIcon
                                    fluid
                                    class="w-full"
                                    iconDisplay="input"
                                    dateFormat="yy-mm-dd"
                                />
                            </div>
                        </div>

                        <!-- Filter Actions -->
                        <div class="flex items-center justify-between border-t pt-4">
                            <div class="text-sm text-muted-foreground">
                                <span v-if="hasActiveFilters">
                                    {{ activeFilterCount }} {{ activeFilterCount === 1 ? 'filter' : 'filters' }} applied
                                </span>
                            </div>
                            <div class="flex gap-2">
                                <Button @click="clearFilters" variant="ghost" size="sm" :disabled="!hasActiveFilters || isFilteringLoading">
                                    Clear All
                                </Button>
                                <BaseButton @click="applyFiltersWithDateFormat" size="sm" variant="default" :loading="isFilteringLoading"
                                    >Filter</BaseButton
                                >
                            </div>
                        </div>
                    </div>
                </template>
            </DataTable>
        </div>
    </AdminLayout>
</template>
