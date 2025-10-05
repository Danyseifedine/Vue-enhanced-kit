<script setup lang="ts">
import DashboardButton from '@/common/components/dashboards/form/DashboardButton.vue';
import DashboardTextInput from '@/common/components/dashboards/form/DashboardTextInput.vue';
import type { BreadcrumbItem } from '@core/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import ActionLayout from '@modules/admin/layouts/ActionLayout.vue';
import InputError from '@shared/components/InputError.vue';
import { Label } from '@ui/label';
import Select from 'primevue/select';
import type { User } from '../datatable/type';

interface Props {
    user: User;
}

const props = defineProps<Props>();

// Define roles (in real app, this would come from props)
const roles = [
    { name: 'Super Admin', code: 'super-admin' },
    { name: 'User', code: 'user' },
];

// Form
const form = useForm({
    name: props.user.name,
    email: props.user.email,
    role: props.user.roles?.[0]?.name || '',
    is_active: props.user.is_active ?? true,
});

// Submit handler
const submit = () => {
    form.put(route('super-admin.users.update', props.user.id), {
        onSuccess: () => {
            router.visit(route('super-admin.users.index'));
        },
    });
};

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: route('super-admin.users.index') },
    { title: 'Edit User', href: route('super-admin.users.edit', props.user.id) },
];
</script>

<template>
    <ActionLayout
        type="edit"
        :title="`Edit ${user.name}`"
        description="Update user information and settings"
        :breadcrumbs="breadcrumbs"
        :back-href="route('super-admin.users.index')"
        :show-card="false"
        max-width="full"
        card-title="User Information"
        card-description="Update the user's details below"
    >
        <Head :title="`Edit ${user.name}`" />

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-6">
            <!-- Name -->
            <div class="space-y-2">
                <Label for="name" required>Name</Label>
                <DashboardTextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter user name"
                    :error="form.errors.name"
                    autofocus
                    required
                />
                <InputError :message="form.errors.name" />
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <Label for="email" required>Email</Label>
                <DashboardTextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email address"
                    :error="form.errors.email"
                    required
                />
                <InputError :message="form.errors.email" />
            </div>

            <!-- Role -->
            <div class="space-y-2">
                <Label for="role">Role</Label>
                <Select
                    v-model="form.role"
                    :options="roles"
                    fluid
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Select role"
                    class="w-full"
                    size="small"
                    :showClear="true"
                />
                <InputError :message="form.errors.role" />
            </div>
        </form>

        <!-- Footer Actions -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <DashboardButton variant="outline" @click="router.visit(route('super-admin.users.index'))" :disabled="form.processing"> Cancel </DashboardButton>
                <DashboardButton @click="submit" :loading="form.processing" variant="default"> Update User </DashboardButton>
            </div>
        </template>
    </ActionLayout>
</template>
