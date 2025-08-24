<script setup lang="ts">
import DataTable from '@/common/components/datatable/Datatable.vue';
import BaseButton from '@/common/components/form/BaseButton.vue';
import { BreadcrumbItem } from '@core/types';
import { Head, router } from '@inertiajs/vue3';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Filter, Plus } from 'lucide-vue-next';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { computed, ref, watch } from 'vue';
import type { User } from './type';
import { userColumns } from './userColumns';
import { formatDateForBackend } from '@/core/utils/formatters';
import { parseDate } from '@/core/utils/parsers';

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
        role: urlFilters?.role || '',
        status: urlFilters?.status || '',
        email_verified: urlFilters?.email_verified || '',
        created_from: parseDate(urlFilters?.created_from),
        created_to: parseDate(urlFilters?.created_to),
    };
};

// Filter state - initialize from props
const localFilters = ref(initializeFilters());
const isFilteringLoading = ref(false);

// Watch for prop changes and update local filters
watch(
    () => props.filters,
    (newFilters) => {
        if (newFilters) {
            localFilters.value = initializeFilters();
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

// Check if filters are active
const hasActiveFilters = computed(() => {
    return (
        localFilters.value.role !== '' ||
        localFilters.value.status !== '' ||
        localFilters.value.email_verified !== '' ||
        localFilters.value.created_from !== null ||
        localFilters.value.created_to !== null
    );
});

// Count active filters
const activeFilterCount = computed(() => {
    let count = 0;
    if (localFilters.value.role !== '') count++;
    if (localFilters.value.status !== '') count++;
    if (localFilters.value.email_verified !== '') count++;
    if (localFilters.value.created_from !== null) count++;
    if (localFilters.value.created_to !== null) count++;
    return count;
});

// Apply filters
const applyFilters = () => {
    const queryParams = {
        ...props.filters,
        role: localFilters.value.role || undefined,
        status: localFilters.value.status || undefined,
        email_verified: localFilters.value.email_verified || undefined,
        // Convert Date objects to strings for URL params
        created_from: formatDateForBackend(localFilters.value.created_from) || undefined,
        created_to: formatDateForBackend(localFilters.value.created_to) || undefined,
    };

    // Remove undefined values
    Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === undefined) {
            delete queryParams[key];
        }
    });

    isFilteringLoading.value = true;

    router.get(route('super-admin.users.index'), queryParams, {
        preserveState: false,
        preserveScroll: true,
        replace: true,
        onFinish: () => {
            isFilteringLoading.value = false;
        },
    });
};

// Clear filters
const clearFilters = () => {
    localFilters.value = {
        role: '',
        status: '',
        email_verified: '',
        created_from: null,
        created_to: null,
    };
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
                        <Badge variant="secondary" class="px-2 py-1">
                            <Filter class="mr-1 h-3 w-3" />
                            {{ activeFilterCount }} {{ activeFilterCount === 1 ? 'filter' : 'filters' }} active
                        </Badge>
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
                                    :scrollHeight="100"
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
                                    :scrollHeight="200"
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
                                    :scrollHeight="200"
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
                                <BaseButton @click="applyFilters" size="sm" variant="default" :loading="isFilteringLoading">Filter</BaseButton>
                            </div>
                        </div>
                    </div>
                </template>
            </DataTable>
        </div>
    </AdminLayout>
</template>
