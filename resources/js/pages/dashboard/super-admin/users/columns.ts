import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    roles: Array<{ name: string; id: number }>
}

// Helper function to copy to clipboard (SSR-safe)
const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined' && navigator?.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.position = 'fixed'
            textArea.style.opacity = '0'
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand('copy')
            } catch (err) {
                console.error('Failed to copy:', err)
            }
            document.body.removeChild(textArea)
        })
    }
}

// Helper to handle navigation (SSR-safe)
const navigateTo = (route: string) => {
    if (typeof window !== 'undefined') {
        // Use Inertia router if available
        router.get(route)
    }
}

// Helper to handle delete (SSR-safe)
const deleteUser = (userId: number) => {
    if (typeof window !== 'undefined' && confirm('Are you sure you want to delete this user?')) {
        router.delete(route('super-admin.users.destroy', userId), {
            preserveScroll: true,
            preserveState: true,
        })
    }
}

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
            'class': 'translate-y-[2px]',
        }),
        cell: ({ row }) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
            'class': 'translate-y-[2px]',
        }),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                class: 'h-8 -ml-4',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => [
                h('span', 'Name'),
                h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
            ])
        },
        cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
        enableColumnFilter: true,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                class: 'h-8 -ml-4',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => [
                h('span', 'Email'),
                h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
            ])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
        enableColumnFilter: true,
    },
    {
        accessorKey: 'roles',
        header: 'Roles',
        cell: ({ row }) => {
            const roles = row.getValue('roles') as Array<{ name: string; id: number }>

            if (!roles || roles.length === 0) {
                return h('span', { class: 'text-muted-foreground text-sm' }, 'No roles')
            }

            const getRoleBadgeVariant = (role: string): any => {
                const variants: Record<string, any> = {
                    'super-admin': 'destructive',
                    'admin': 'default',
                    'editor': 'secondary',
                    'user': 'outline',
                }
                return variants[role] || 'outline'
            }

            return h('div', { class: 'flex flex-wrap gap-1' },
                roles.map(role =>
                    h(Badge, {
                        key: role.id,
                        variant: getRoleBadgeVariant(role.name),
                        class: 'text-xs'
                    }, () => role.name)
                )
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Status',
        cell: ({ row }) => {
            const isVerified = row.getValue('email_verified_at')
            return h(Badge, {
                variant: isVerified ? 'success' : 'secondary',
                class: 'text-xs'
            }, () => isVerified ? 'Verified' : 'Unverified')
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                class: 'h-8 -ml-4',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => [
                h('span', 'Created'),
                h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
            ])
        },
        cell: ({ row }) => {
            const dateString = row.getValue('created_at') as string
            // SSR-safe date formatting
            const formatDate = (dateStr: string) => {
                try {
                    const date = new Date(dateStr)
                    // Use a simple format that works on server and client
                    const month = (date.getMonth() + 1).toString().padStart(2, '0')
                    const day = date.getDate().toString().padStart(2, '0')
                    const year = date.getFullYear()
                    return `${month}/${day}/${year}`
                } catch {
                    return dateStr
                }
            }

            return h('div', { class: 'text-sm' }, formatDate(dateString))
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        size: 40,
        cell: ({ row }) => {
            const user = row.original

            return h('div', { class: 'flex items-center justify-end' },
                h(DropdownMenu, {}, {
                    default: () => [
                        h(DropdownMenuTrigger, { asChild: true }, {
                            default: () => h(Button, {
                                variant: 'ghost',
                                class: 'h-8 w-8 p-0',
                                'aria-label': 'Open menu'
                            }, {
                                default: () => [
                                    h('span', { class: 'sr-only' }, 'Open menu'),
                                    h(MoreHorizontal, { class: 'h-4 w-4' })
                                ]
                            })
                        }),
                        h(DropdownMenuContent, { align: 'end', class: 'w-[160px]' }, {
                            default: () => [
                                h(DropdownMenuLabel, {}, () => 'Actions'),
                                h(DropdownMenuItem, {
                                    onClick: () => copyToClipboard(user.id.toString()),
                                    class: 'cursor-pointer'
                                }, () => 'Copy user ID'),
                                h(DropdownMenuSeparator),
                                h(DropdownMenuItem, {
                                    onClick: () => {
                                        // Check if we're in the browser before using route helper
                                        if (typeof window !== 'undefined' && typeof route !== 'undefined') {
                                            navigateTo(route('super-admin.users.show', user.id))
                                        }
                                    },
                                    class: 'cursor-pointer'
                                }, () => 'View user'),
                                h(DropdownMenuItem, {
                                    onClick: () => {
                                        // Check if we're in the browser before using route helper
                                        if (typeof window !== 'undefined' && typeof route !== 'undefined') {
                                            navigateTo(route('super-admin.users.edit', user.id))
                                        }
                                    },
                                    class: 'cursor-pointer'
                                }, () => 'Edit user'),
                                h(DropdownMenuItem, {
                                    onClick: () => {
                                        // Check if we're in the browser before using route helper
                                        if (typeof window !== 'undefined' && typeof route !== 'undefined') {
                                            deleteUser(user.id)
                                        }
                                    },
                                    class: 'cursor-pointer text-destructive focus:text-destructive'
                                }, () => 'Delete user'),
                            ]
                        })
                    ]
                })
            )
        },
    },
]
