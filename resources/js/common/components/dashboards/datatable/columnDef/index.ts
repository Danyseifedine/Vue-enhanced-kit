import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type {
    AnyColumnConfig,
    TextColumnConfig,
    BadgeColumnConfig,
    DateColumnConfig,
    SelectColumnConfig,
    CounterColumnConfig,
    ToggleColumnConfig,
    ActionsColumnConfig
} from '../index'
import SelectColumn from './SelectColumn.vue'
import CounterColumn from './CounterColumn.vue'
import ToggleColumn from './ToggleColumn.vue'
import TextColumn from './TextColumn.vue'
import BadgeColumn from './BadgeColumn.vue'
import DateColumn from './DateColumn.vue'
import ActionsColumn from './ActionsColumn.vue'
import SortableHeader from './SortableHeader.vue'

/**
 * Create table columns from configuration
 */
export function createColumns<TData>(configs: AnyColumnConfig[]): ColumnDef<TData>[] {
    return configs.map(config => {
        // Base column configuration
        const baseColumn: ColumnDef<TData> = {
            id: config.key,
            accessorKey: config.key,
            enableSorting: config.sortable ?? false,
            enableHiding: config.visible !== false,
            meta: {
                label: config.label || config.key,
                width: config.width,
                className: config.className,
                headerClassName: config.headerClassName,
            }
        }

        // Add sortable header if needed
        if (config.sortable) {
            baseColumn.header = ({ column }) => h(SortableHeader, {
                column,
                label: config.label || config.key,
            })
        } else if (config.label) {
            baseColumn.header = config.label
        }

        // Handle different column types
        switch (config.type) {
            case 'select':
                return {
                    ...baseColumn,
                    id: 'select',
                    accessorKey: undefined,
                    header: ({ table }) => h(SelectColumn, {
                        table,
                        mode: 'header'
                    }),
                    cell: ({ row }) => h(SelectColumn, {
                        row,
                        mode: 'cell'
                    }),
                    enableSorting: false,
                    size: 40,
                }

            case 'counter':
                const counterConfig = config as CounterColumnConfig
                return {
                    ...baseColumn,
                    id: 'counter',
                    accessorKey: undefined,
                    header: counterConfig.label || '#',
                    cell: ({ row }) => h(CounterColumn, {
                        rowIndex: row.index,
                        startFrom: counterConfig.startFrom,
                    }),
                    enableSorting: false,
                    enableHiding: false,
                    size: 60,
                }

            case 'toggle':
                const toggleConfig = config as ToggleColumnConfig
                return {
                    ...baseColumn,
                    header: toggleConfig.label,
                    cell: ({ row }) => h(ToggleColumn, {
                        value: row.getValue(config.key),
                        row: row.original,
                        onToggle: toggleConfig.onToggle,
                        disabled: toggleConfig.disabled,
                        toggledWhen: toggleConfig.toggledWhen,
                        size: toggleConfig.size,
                    }),
                    enableSorting: false,
                    size: 80,
                }

            case 'text':
                const textConfig = config as TextColumnConfig
                if (textConfig.format) {
                    baseColumn.cell = ({ row }) => h(TextColumn, {
                        value: row.getValue(config.key),
                        format: textConfig.format,
                    })
                }
                break

            case 'badge':
                const badgeConfig = config as BadgeColumnConfig
                baseColumn.cell = ({ row }) => h(BadgeColumn, {
                    value: row.getValue(config.key),
                    variants: badgeConfig.variants,
                    defaultVariant: badgeConfig.defaultVariant,
                })
                break

            case 'date':
                const dateConfig = config as DateColumnConfig
                baseColumn.cell = ({ row }) => h(DateColumn, {
                    value: row.getValue(config.key) as string | Date | null,
                    format: dateConfig.format,
                    relative: dateConfig.relative,
                })
                break

            case 'actions':
                const actionsConfig = config as ActionsColumnConfig
                return {
                    ...baseColumn,
                    id: 'actions',
                    accessorKey: undefined,
                    header: '',
                    cell: ({ row }) => h(ActionsColumn, {
                        row: row.original,
                        actions: actionsConfig.actions,
                    }),
                    enableSorting: false,
                    enableHiding: false,
                    size: 40,
                }
        }

        return baseColumn
    })
}

/**
 * Helper function to create a text column
 */
export function textColumn(
    key: string,
    label?: string,
    options?: Partial<TextColumnConfig>
): TextColumnConfig {
    return {
        type: 'text',
        key,
        label: label || key,
        sortable: true,
        ...options,
    }
}

/**
 * Helper function to create a badge column
 */
export function badgeColumn(
    key: string,
    label?: string,
    variants?: Record<string, string>,
    options?: Partial<BadgeColumnConfig>
): BadgeColumnConfig {
    return {
        type: 'badge',
        key,
        label: label || key,
        variants,
        ...options,
    }
}

/**
 * Helper function to create a date column
 */
export function dateColumn(
    key: string,
    label?: string,
    options?: Partial<DateColumnConfig>
): DateColumnConfig {
    return {
        type: 'date',
        key,
        label: label || key,
        sortable: true,
        ...options,
    }
}

/**
 * Helper function to create a select column
 */
export function selectColumn(): SelectColumnConfig {
    return {
        type: 'select',
        key: 'select',
    }
}

/**
 * Helper function to create a counter column
 */
export function counterColumn(
    label?: string,
    options?: Partial<CounterColumnConfig>
): CounterColumnConfig {
    return {
        type: 'counter',
        key: 'counter',
        label: label || '#',
        startFrom: 1,
        ...options,
    }
}

/**
 * Helper function to create a toggle column
 */
export function toggleColumn(
    key: string,
    label?: string,
    options?: Partial<ToggleColumnConfig>
): ToggleColumnConfig {
    return {
        type: 'toggle',
        key,
        label: label || key,
        size: 'default',
        ...options,
    }
}

/**
 * Helper function to create an actions column
 */
export function actionsColumn(
    actions: ActionsColumnConfig['actions'],
    options?: Partial<ActionsColumnConfig>
): ActionsColumnConfig {
    return {
        type: 'actions',
        key: 'actions',
        actions,
        ...options,
    }
}
