<script setup lang="ts">
import DashboardButton from '@/common/components/dashboards/form/DashboardButton.vue';
import DashboardTextInput from '@/common/components/dashboards/form/DashboardTextInput.vue';
import DashboardMaskedInput from '@/common/components/dashboards/form/DashboardMaskedInput.vue';
import DashboardSelect from '@/common/components/dashboards/form/DashboardSelect.vue';
import type { BreadcrumbItem } from '@core/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import ActionLayout from '@modules/admin/layouts/ActionLayout.vue';
import InputError from '@shared/components/InputError.vue';
import { Label } from '@ui/label';

// Define roles (in real app, this would come from props)
const roles = [
    { name: 'Super Admin', code: 'super-admin' },
    { name: 'User', code: 'user' },
];

// Form
const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
    is_active: true,
});

// Submit handler
const submit = () => {
    form.post(route('super-admin.users.store'), {
        onSuccess: () => {
            router.visit(route('super-admin.users.index'));
        },
    });
};

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: route('super-admin.users.index') },
    { title: 'Create User', href: route('super-admin.users.create') },
];
</script>

<template>
    <ActionLayout
        type="create"
        title="Create User"
        description="Fill in the details below to create a new user account"
        :breadcrumbs="breadcrumbs"
        :back-href="route('super-admin.users.index')"
        :show-card="false"
        max-width="full"
        card-title="User Information"
        card-description="Fill in the details below to create a new user account"
    >
        <Head title="Create User" />

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-6">
            <!-- Name & Email -->
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <Label for="password" required>Password</Label>
                <DashboardMaskedInput
                    id="password"
                    v-model="form.password"
                    placeholder="Enter password"
                    :error="form.errors.password"
                    toggleMask
                    size="small"
                    required
                />
                <InputError :message="form.errors.password" />
            </div>

            <!-- Password Confirmation -->
            <div class="space-y-2">
                <Label for="password_confirmation" required>Confirm Password</Label>
                <DashboardMaskedInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    placeholder="Confirm password"
                    :error="form.errors.password_confirmation"
                    toggleMask
                    required
                />
                <InputError :message="form.errors.password_confirmation" />
            </div>

            <!-- Role -->
            <div class="space-y-2">
                <Label for="role">Role</Label>
                <DashboardSelect
                    id="role"
                    v-model="form.role"
                    :options="roles"
                    placeholder="Select role"
                    :error="form.errors.role"
                    filter
                />
                <InputError :message="form.errors.role" />
            </div>
        </form>

        <!-- Footer Actions -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <DashboardButton @click="router.visit(route('super-admin.users.index'))" variant="secondary"> Cancel </DashboardButton>
                <DashboardButton @click="submit" :loading="form.processing" variant="default"> Create User </DashboardButton>
            </div>
        </template>
    </ActionLayout>
</template>
