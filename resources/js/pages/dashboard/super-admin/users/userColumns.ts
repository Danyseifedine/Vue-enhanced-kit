import {
    createColumns,
    selectColumn,
    textColumn,
    badgeColumn,
    dateColumn,
    actionsColumn
} from '@/common/components/datatable/columnDef'
import { Copy, Eye, Edit, Trash2 } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import type { User } from './type'

export const userColumns = createColumns<User>([
    // Checkbox selection
    selectColumn(),

    // Name with custom styling
    textColumn('name', 'Name', {
        sortable: true,
        searchable: true,
        className: 'font-medium font-bold',
    }),

    // Email
    textColumn('email', 'Email', {
        sortable: true,
        searchable: true,
        className: 'lowercase',
    }),

    // Roles with badge variants
    badgeColumn('roles', 'Roles', {
        'super-admin': 'destructive',
        'admin': 'default',
        'editor': 'secondary',
        'user': 'outline',
    }),

    // Verification status
    textColumn('email_verified_at', 'Status', {
        format: (value: any) => {
            console.log(value)
            if (value) {
                return 'verified'
            } else {
                return 'unverified'
            }
        },
    }),

    // Join date
    dateColumn('created_at', 'Joined', {
        relative: true,
    }),

    // Actions menu
    actionsColumn([
        {
            label: 'Copy ID',
            icon: Copy,
            onClick: (user) => {
                navigator.clipboard.writeText(user.id.toString())
                // Show toast notification
            },
        },
        { separator: true, label: 'Separator' },
        {
            label: 'View',
            icon: Eye,
            href: (user) => route('users.show', user.id),
        },
        {
            label: 'Edit',
            icon: Edit,
            href: (user) => route('users.edit', user.id),
        },
        { separator: true, label: 'Separator' },
        {
            label: 'Delete',
            icon: Trash2,
            destructive: true,
            onClick: (user) => {
                if (confirm('Are you sure?')) {
                    router.delete(route('users.destroy', user.id))
                }
            },
        },
    ]),
])
