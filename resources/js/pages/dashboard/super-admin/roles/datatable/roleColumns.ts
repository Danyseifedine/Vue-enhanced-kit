import {
    createColumns,
    selectColumn,
    textColumn,
    badgeColumn,
    dateColumn,
    actionsColumn
} from '@/common/components/dashboards/datatable/columnDef'
import { Copy, Eye, Edit, Trash2 } from 'lucide-vue-next'
import type { Role } from './type'

export const roleColumns = createColumns<Role>([

    // Row counter (change to selectColumn() for checkboxes)
    selectColumn(),

    // Name with custom styling
    textColumn('name', 'Name', {
        sortable: true,
        searchable: true,
        visible: true,
        className: 'font-medium font-bold',
    }),

    // Permissions count
    textColumn('permissions_count', 'Permissions', {
        format: (value: any) => {
            const count = value || 0;
            return `${count} ${count === 1 ? 'permission' : 'permissions'}`;
        },
    }),

    // Join date
    dateColumn('created_at', 'Created', {
        relative: true,
    }),

    // Actions menu
    actionsColumn([
        {
            label: 'Copy ID',
            icon: Copy,
            onClick: (role) => {
                navigator.clipboard.writeText(role.id.toString())
            },
        },
        { separator: true, label: 'Separator' },
        {
            label: 'View',
            icon: Eye,
            href: (role) => route('super-admin.roles.show', role.id),
        },
        {
            label: 'Edit',
            icon: Edit,
            href: (role) => route('super-admin.roles.edit', role.id),
        },
        { separator: true, label: 'Separator' },
        {
            label: 'Delete',
            icon: Trash2,
            destructive: true,
            onClick: (role) => {
                // Call the global openDeleteDialog function
                if ((window as any).openRoleDeleteDialog) {
                    (window as any).openRoleDeleteDialog(role);
                }
            },
        },
    ]),
])

