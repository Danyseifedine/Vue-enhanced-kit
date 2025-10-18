import {
    createColumns,
    counterColumn,
    toggleColumn,
    textColumn,
    badgeColumn,
    dateColumn,
    actionsColumn
} from '@/common/components/dashboards/datatable/columnDef'
import { Copy, Eye, Edit, Trash2 } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import type { User } from './type'
import { useToast } from '@/core/composables/useToast';
import { useGuard } from '@/guard'
import { convertToBoolean } from '@/core/utils/converters';
import { ref } from 'vue';

const { showCopyToClipboardToast } = useToast();
const { userIsSuperAdmin } = useGuard();

const isToggleLoading = ref(false);

export const userColumns = createColumns<User>([

    // Row counter (change to selectColumn() for checkboxes)
    counterColumn('#', {
        startFrom: 1,
    }),

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
    badgeColumn('roles', 'Roles'),

    // Active status toggle
    toggleColumn('is_active', 'Active', {
        onToggle: (value: boolean, user: User, control) => {
            router.patch(route('super-admin.users.toggle-status', user.id), { is_active: value }, {
                preserveScroll: true,
                preserveState: true,
                onStart: () => {
                    isToggleLoading.value = true;
                },
                onFinish: () => {
                    isToggleLoading.value = false;
                },
                onSuccess: (page) => {
                    const response = (page.props as any).flash?.toast;
                    if (response?.success === false) {
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
                showCopyToClipboardToast('User ID');
            },
        },
        { separator: true, label: 'Separator' },
        {
            label: 'View',
            icon: Eye,
            href: (user) => route('super-admin.users.show', user.id),
        },
        {
            label: 'Edit',
            icon: Edit,
            href: (user) => route('super-admin.users.edit', user.id),
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
                // Call the global openDeleteDialog function
                if ((window as any).openDeleteDialog) {
                    (window as any).openDeleteDialog(user);
                }
            },
        },
    ]),
])
