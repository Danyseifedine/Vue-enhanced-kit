// Main configuration interface
export interface DataTableConfig {
    // Search configuration
    searchable?: boolean
    searchPlaceholder?: string
    searchKey?: string

    // Feature toggles
    selectable?: boolean
    columnVisibility?: boolean
    perPageSelector?: boolean
    perPageOptions?: number[]

    // Server-side configuration
    serverSide?: boolean
    pagination?: PaginationData
    filters?: FilterData

    // Inertia.js routing
    routeName?: string
    preserveState?: boolean
    preserveScroll?: boolean
}

// Pagination data from server
export interface PaginationData {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
}

// Filter parameters
export interface FilterData {
    search?: string
    sort?: string
    direction?: 'asc' | 'desc'
    per_page?: number
    [key: string]: any
}

// Base column configuration
export interface ColumnConfig {
    key: string
    label?: string
    sortable?: boolean
    searchable?: boolean
    visible?: boolean
    width?: number | string
    className?: string
    headerClassName?: string
}

// Text column configuration
export interface TextColumnConfig extends ColumnConfig {
    type: 'text'
    format?: (value: any) => string
}

// Badge column configuration
export interface BadgeColumnConfig extends ColumnConfig {
    type: 'badge'
    variants?: Record<string, string>
    defaultVariant?: string
    multiple?: boolean
}

// Date column configuration
export interface DateColumnConfig extends ColumnConfig {
    type: 'date'
    format?: string
    relative?: boolean
}

// Select column configuration
export interface SelectColumnConfig extends ColumnConfig {
    type: 'select'
}

// Actions column configuration
export interface ActionsColumnConfig extends ColumnConfig {
    type: 'actions'
    actions: ActionItem[]
}

// Action item in dropdown
export interface ActionItem {
    label: string
    icon?: any
    onClick?: (row: any) => void
    href?: (row: any) => string
    show?: (row: any) => boolean
    destructive?: boolean
    separator?: boolean
}

// Union type for all column configurations
export type AnyColumnConfig =
    | TextColumnConfig
    | BadgeColumnConfig
    | DateColumnConfig
    | SelectColumnConfig
    | ActionsColumnConfig
