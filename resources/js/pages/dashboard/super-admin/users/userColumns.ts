import {
    createColumns,
    counterColumn,
    toggleColumn,
    textColumn,
    badgeColumn,
    dateColumn,
    actionsColumn
} from '@/common/components/datatable/columnDef'
import { Copy, Eye, Edit, Trash2 } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import type { User } from './type'

import { useGuard } from '@/guard'
import { convertToBoolean } from '@/core/utils/converters';
import { ref } from 'vue';

const { userIsSuperAdmin } = useGuard();

const isToggleLoading = ref(false);

export const userColumns = createColumns<User>([

    // Row counter (change to selectColumn() for checkboxes)
    counterColumn(' ', { startFrom: 1 }),

    // Name with custom styling
    textColumn('name', 'Name', {
        sortable: true,
        searchable: true,
        visible: true,
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
        'super-admin': 'default',
        'user': 'outline',
    }),

    // Active status toggle
    toggleColumn('is_active', 'Active', {
        onToggle: (value: boolean, user: User, control) => {
            router.patch(route('super-admin.users.toggle-status', user.id), { is_active: value }, {
                onStart: () => {
                    isToggleLoading.value = true;
                },
                onFinish: () => {
                    isToggleLoading.value = false;
                },
                onSuccess: (page) => {
                    const toast = (page.props as any).flash?.toast;
                    if (toast?.type === 'error') {
                        control.revert();
                    }
                }
            });
        },
        disabled: (user: User) => {
            return userIsSuperAdmin(user) || isToggleLoading.value;
        },

        toggledWhen: (value: any) => {
            return convertToBoolean(value);
        },
        size: 'sm',
        className: 'flex justify-start',
    }),

    // Verification status
    textColumn('email_verified_at', 'Status', {
        format: (value: any) => {
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
        { separator: true, label: 'Separator', show: (user: User) => !userIsSuperAdmin(user) },
        {
            show: (user: User) => {
                return !userIsSuperAdmin(user);
            },
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
