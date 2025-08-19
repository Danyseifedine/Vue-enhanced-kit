import { ref, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import type {
    ColumnFiltersState,
    SortingState,
    VisibilityState
} from '@tanstack/vue-table'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable
} from '@tanstack/vue-table'

export function useDataTable(props: any, emit: any) {
    // Initialize sorting from server filters
    const initSorting = (): SortingState => {
        if (props.config?.filters?.sort) {
            return [{
                id: props.config.filters.sort,
                desc: props.config.filters.direction === 'desc',
            }]
        }
        return []
    }

    // State management
    const sorting = ref<SortingState>(initSorting())
    const columnFilters = ref<ColumnFiltersState>([])
    const columnVisibility = ref<VisibilityState>({})
    const rowSelection = ref({})
    const globalFilter = ref(props.config?.filters?.search || '')

    // Debounce timer for search
    let searchTimer: ReturnType<typeof setTimeout> | null = null

    // Update server-side data
    const updateServerData = (params: Record<string, any>) => {
        // Only run in browser and if server-side is enabled
        if (typeof window === 'undefined' || !props.config?.serverSide) return

        // Merge with existing filters
        const queryParams = {
            ...props.config.filters,
            ...params,
        }

        // Remove empty values
        Object.keys(queryParams).forEach((key) => {
            if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
                delete queryParams[key]
            }
        })

        // Emit filter update event
        emit('update:filters', queryParams)

        // Use Inertia router if route name is provided
        if (props.config.routeName && typeof route !== 'undefined') {
            router.get(route(props.config.routeName), queryParams, {
                preserveState: props.config.preserveState ?? false,
                preserveScroll: props.config.preserveScroll ?? true,
                replace: true,
            })
        }
    }

    // Create table instance
    const table = useVueTable({
        data: props.data,
        columns: props.columns,
        state: {
            get sorting() { return sorting.value },
            get columnFilters() { return columnFilters.value },
            get columnVisibility() { return columnVisibility.value },
            get rowSelection() { return rowSelection.value },
            get globalFilter() { return globalFilter.value },
        },
        onSortingChange: (updater) => {
            sorting.value = typeof updater === 'function'
                ? updater(sorting.value)
                : updater

            // Handle server-side sorting
            if (props.config?.serverSide && sorting.value.length > 0) {
                const sort = sorting.value[0]
                updateServerData({
                    sort: sort.id,
                    direction: sort.desc ? 'desc' : 'asc',
                })
            }
        },
        onColumnFiltersChange: (updater) => {
            columnFilters.value = typeof updater === 'function'
                ? updater(columnFilters.value)
                : updater
        },
        onColumnVisibilityChange: (updater) => {
            columnVisibility.value = typeof updater === 'function'
                ? updater(columnVisibility.value)
                : updater
        },
        onRowSelectionChange: (updater) => {
            rowSelection.value = typeof updater === 'function'
                ? updater(rowSelection.value)
                : updater

            // Emit selection change event
            const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original)
            emit('selection-change', selectedRows)
        },
        onGlobalFilterChange: (updater) => {
            globalFilter.value = typeof updater === 'function'
                ? updater(globalFilter.value)
                : updater
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: props.config?.serverSide ? undefined : getPaginationRowModel(),
        getSortedRowModel: props.config?.serverSide ? getCoreRowModel() : getSortedRowModel(),
        getFilteredRowModel: props.config?.serverSide ? getCoreRowModel() : getFilteredRowModel(),
        manualPagination: !!props.config?.serverSide,
        manualSorting: !!props.config?.serverSide,
        manualFiltering: !!props.config?.serverSide,
        pageCount: props.config?.pagination?.last_page,
    })

    // Search handler with debouncing
    const handleSearch = (value: string) => {
        globalFilter.value = value

        if (props.config?.serverSide) {
            // Clear existing timer
            if (searchTimer) clearTimeout(searchTimer)

            // Set new timer for debounced search
            searchTimer = setTimeout(() => {
                updateServerData({ search: value, page: 1 })
            }, 300)
        } else {
            // Client-side filtering
            table.setGlobalFilter(value)
        }
    }

    // Per page change handler
    const handlePerPageChange = (value: number) => {
        if (props.config?.serverSide) {
            updateServerData({ per_page: value, page: 1 })
        } else {
            table.setPageSize(value)
        }
    }

    // Pagination navigation
    const goToPage = (page: number) => {
        if (props.config?.serverSide) {
            updateServerData({ page })
        } else {
            table.setPageIndex(page - 1)
        }
    }

    const nextPage = () => {
        const pagination = props.config?.pagination
        if (props.config?.serverSide && pagination) {
            if (pagination.current_page < pagination.last_page) {
                goToPage(pagination.current_page + 1)
            }
        } else {
            table.nextPage()
        }
    }

    const previousPage = () => {
        const pagination = props.config?.pagination
        if (props.config?.serverSide && pagination) {
            if (pagination.current_page > 1) {
                goToPage(pagination.current_page - 1)
            }
        } else {
            table.previousPage()
        }
    }

    const firstPage = () => goToPage(1)

    const lastPage = () => {
        if (props.config?.serverSide && props.config?.pagination) {
            goToPage(props.config.pagination.last_page)
        } else {
            table.setPageIndex(table.getPageCount() - 1)
        }
    }

    // Computed properties for pagination state
    const canPreviousPage = computed(() => {
        if (props.config?.serverSide && props.config?.pagination) {
            return props.config.pagination.current_page > 1
        }
        return table.getCanPreviousPage()
    })

    const canNextPage = computed(() => {
        if (props.config?.serverSide && props.config?.pagination) {
            return props.config.pagination.current_page < props.config.pagination.last_page
        }
        return table.getCanNextPage()
    })

    const currentPage = computed(() => {
        if (props.config?.serverSide && props.config?.pagination) {
            return props.config.pagination.current_page
        }
        return table.getState().pagination.pageIndex + 1
    })

    const pageCount = computed(() => {
        if (props.config?.serverSide && props.config?.pagination) {
            return props.config.pagination.last_page
        }
        return table.getPageCount()
    })

    // Reset selection when data changes
    watch(() => props.data, () => {
        rowSelection.value = {}
    })

    // Cleanup on unmount
    const cleanup = () => {
        if (searchTimer) {
            clearTimeout(searchTimer)
        }
    }

    return {
        // State
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        globalFilter,
        table,
        // Computed
        currentPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        // Handlers
        handleSearch,
        handlePerPageChange,
        goToPage,
        nextPage,
        previousPage,
        firstPage,
        lastPage,
        cleanup,
    }
}
