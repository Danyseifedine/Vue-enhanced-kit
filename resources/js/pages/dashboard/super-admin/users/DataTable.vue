<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/vue-table';
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';

import { router } from '@inertiajs/vue3';
import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

interface DataTableProps {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters?: {
        search?: string;
        sort?: string;
        direction?: string;
        [key: string]: any;
    };
    searchKey?: string;
    searchPlaceholder?: string;
}

const props = withDefaults(defineProps<DataTableProps>(), {
    searchKey: 'email',
    searchPlaceholder: 'Search...',
});

// Initialize sorting from server filters
const initSorting = (): SortingState => {
    if (props.filters?.sort) {
        return [
            {
                id: props.filters.sort,
                desc: props.filters.direction === 'desc',
            },
        ];
    }
    return [];
};

const sorting = ref<SortingState>(initSorting());
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const globalFilter = ref(props.filters?.search || '');

// Debounce timer ref
let searchTimer: any = null;

// Create table instance
const table = useVueTable({
    data: props.data,
    columns: props.columns,
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
        get globalFilter() {
            return globalFilter.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;

        // Handle server-side sorting
        if (props.pagination && sorting.value.length > 0) {
            const sort = sorting.value[0];
            updateServerData({
                sort: sort.id,
                direction: sort.desc ? 'desc' : 'asc',
            });
        }
    },
    onColumnFiltersChange: (updaterOrValue) => {
        columnFilters.value = typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue;
    },
    onColumnVisibilityChange: (updaterOrValue) => {
        columnVisibility.value = typeof updaterOrValue === 'function' ? updaterOrValue(columnVisibility.value) : updaterOrValue;
    },
    onRowSelectionChange: (updaterOrValue) => {
        rowSelection.value = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection.value) : updaterOrValue;
    },
    onGlobalFilterChange: (updaterOrValue) => {
        globalFilter.value = typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: props.pagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: props.pagination ? getCoreRowModel() : getSortedRowModel(),
    getFilteredRowModel: props.pagination ? getCoreRowModel() : getFilteredRowModel(),
    manualPagination: !!props.pagination,
    manualSorting: !!props.pagination,
    manualFiltering: !!props.pagination,
    pageCount: props.pagination ? props.pagination.last_page : undefined,
});

// Handle search with debounce
const handleSearch = (value: string) => {
    globalFilter.value = value;

    if (props.pagination) {
        // Clear existing timer
        if (searchTimer) {
            clearTimeout(searchTimer);
        }

        // Set new timer for debounced search
        searchTimer = setTimeout(() => {
            updateServerData({ search: value, page: 1 });
        }, 300);
    } else {
        // Client-side filtering
        table.setGlobalFilter(value);
    }
};

// Update server data with Inertia
const updateServerData = (params: Record<string, any>) => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Merge with existing filters
    const queryParams = {
        ...props.filters,
        ...params,
    };

    // Remove empty values
    Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
            delete queryParams[key];
        }
    });

    // Use Inertia router to update URL and fetch new data
    router.get(route('super-admin.users.index'), queryParams, {
        preserveState: false,
        preserveScroll: true,
        replace: true,
    });
};

// Pagination handlers
const goToPage = (page: number) => {
    if (props.pagination) {
        updateServerData({ page });
    } else {
        table.setPageIndex(page - 1);
    }
};

const nextPage = () => {
    if (props.pagination && props.pagination.current_page < props.pagination.last_page) {
        goToPage(props.pagination.current_page + 1);
    } else if (!props.pagination) {
        table.nextPage();
    }
};

const previousPage = () => {
    if (props.pagination && props.pagination.current_page > 1) {
        goToPage(props.pagination.current_page - 1);
    } else if (!props.pagination) {
        table.previousPage();
    }
};

const firstPage = () => {
    goToPage(1);
};

const lastPage = () => {
    if (props.pagination) {
        goToPage(props.pagination.last_page);
    } else {
        table.setPageIndex(table.getPageCount() - 1);
    }
};

// Computed properties
const canPreviousPage = computed(() => {
    if (props.pagination) {
        return props.pagination.current_page > 1;
    }
    return table.getCanPreviousPage();
});

const canNextPage = computed(() => {
    if (props.pagination) {
        return props.pagination.current_page < props.pagination.last_page;
    }
    return table.getCanNextPage();
});

const currentPage = computed(() => {
    if (props.pagination) {
        return props.pagination.current_page;
    }
    return table.getState().pagination.pageIndex + 1;
});

const pageCount = computed(() => {
    if (props.pagination) {
        return props.pagination.last_page;
    }
    return table.getPageCount();
});

const selectedRowsText = computed(() => {
    const selectedCount = table.getFilteredSelectedRowModel().rows.length;
    const totalCount = props.pagination ? props.pagination.total : table.getFilteredRowModel().rows.length;

    if (selectedCount === 0) {
        return `${totalCount} total row(s)`;
    }
    return `${selectedCount} of ${totalCount} row(s) selected`;
});

// Per page handler
const handlePerPageChange = (value: number) => {
    if (props.pagination) {
        updateServerData({ per_page: value, page: 1 });
    } else {
        table.setPageSize(value);
    }
};

// Watch for data changes
watch(
    () => props.data,
    () => {
        // Reset selection when data changes
        rowSelection.value = {};
    },
);

// Cleanup on unmount
onMounted(() => {
    return () => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
    };
});
</script>

<template>
    <div class="w-full space-y-4">
        <!-- Toolbar -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-1 items-center space-x-2">
                <Input
                    :model-value="globalFilter"
                    :placeholder="searchPlaceholder"
                    class="h-8 w-full sm:w-[250px] lg:w-[350px]"
                    @update:model-value="handleSearch"
                />
            </div>

            <div class="flex items-center space-x-2">
                <!-- Per Page Selector -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" size="sm" class="h-8 gap-1">
                            <span class="hidden sm:inline">Show</span>
                            {{ props.pagination?.per_page || 10 }}
                            <ChevronDown class="h-3.5 w-3.5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="pageSize in [10, 20, 30, 50, 100]"
                            :key="pageSize"
                            :checked="(props.pagination?.per_page || 10) === pageSize"
                            @click.prevent="handlePerPageChange(pageSize)"
                        >
                            {{ pageSize }} per page
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <!-- Column Visibility -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" size="sm" class="h-8 gap-1">
                            <span class="hidden sm:inline">Columns</span>
                            <ChevronDown class="h-3.5 w-3.5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-[150px]">
                        <DropdownMenuCheckboxItem
                            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                            :key="column.id"
                            class="capitalize"
                            :checked="column.getIsVisible()"
                            @click.prevent="column.toggleVisibility(!column.getIsVisible())"
                        >
                            {{ column.id }}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <!-- Table -->
        <div class="rounded-md border">
            <div class="relative w-full overflow-auto">
                <Table class="w-full caption-bottom text-sm">
                    <TableHeader>
                        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <TableHead
                                v-for="header in headerGroup.headers"
                                :key="header.id"
                                class="h-12 whitespace-nowrap px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                                :style="{
                                    width: header.column.getSize() === 150 ? undefined : `${header.column.getSize()}px`,
                                }"
                            >
                                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <template v-if="table.getRowModel().rows?.length">
                            <TableRow
                                v-for="row in table.getRowModel().rows"
                                :key="row.id"
                                :data-state="row.getIsSelected() ? 'selected' : undefined"
                                class="hover:bg-muted/50"
                            >
                                <TableCell
                                    v-for="cell in row.getVisibleCells()"
                                    :key="cell.id"
                                    class="whitespace-nowrap p-4 align-middle [&:has([role=checkbox])]:pr-0"
                                >
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                        </template>

                        <TableRow v-else>
                            <TableCell :colspan="columns.length" class="h-24 text-center"> No results found. </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
            <div class="text-sm text-muted-foreground">
                {{ selectedRowsText }}
            </div>

            <div class="flex items-center justify-center space-x-2 sm:justify-end">
                <div class="flex items-center space-x-1">
                    <Button variant="outline" size="icon" class="h-8 w-8" :disabled="!canPreviousPage" @click="firstPage">
                        <ChevronsLeft class="h-4 w-4" />
                        <span class="sr-only">First page</span>
                    </Button>
                    <Button variant="outline" size="icon" class="h-8 w-8" :disabled="!canPreviousPage" @click="previousPage">
                        <ChevronLeft class="h-4 w-4" />
                        <span class="sr-only">Previous page</span>
                    </Button>

                    <div class="flex items-center gap-1 px-2">
                        <span class="text-sm font-medium"> Page {{ currentPage }} of {{ pageCount }} </span>
                    </div>

                    <Button variant="outline" size="icon" class="h-8 w-8" :disabled="!canNextPage" @click="nextPage">
                        <ChevronRight class="h-4 w-4" />
                        <span class="sr-only">Next page</span>
                    </Button>
                    <Button variant="outline" size="icon" class="h-8 w-8" :disabled="!canNextPage" @click="lastPage">
                        <ChevronsRight class="h-4 w-4" />
                        <span class="sr-only">Last page</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
