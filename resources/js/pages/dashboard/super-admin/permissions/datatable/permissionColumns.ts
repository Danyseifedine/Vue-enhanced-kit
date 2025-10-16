import {
    createColumns,
    textColumn,
    badgeColumn,
    dateColumn,
    counterColumn
} from '@/common/components/dashboards/datatable/columnDef'
import type { Permission } from './type'

export const permissionColumns = createColumns<Permission>([

    // Row counter (change to selectColumn() for checkboxes)
    counterColumn('#', {
        startFrom: 1,
    }),
    // Name with custom styling
    textColumn('name', 'Permission', {
        sortable: true,
        searchable: true,
        visible: true,
        className: 'font-medium font-bold',
    }),

    // Roles with badge variants
    badgeColumn('roles', 'Roles'),

    // Join date
    dateColumn('created_at', 'Created', {
        relative: true,
    }),
])

