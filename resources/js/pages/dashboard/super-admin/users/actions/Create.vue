<script setup lang="ts">
import DashboardButton from '@/common/components/dashboards/form/DashboardButton.vue';
import type { BreadcrumbItem } from '@core/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import ActionLayout from '@modules/admin/layouts/ActionLayout.vue';
import InputError from '@shared/components/InputError.vue';
import { Label } from '@ui/label';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

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
            <!-- Name -->
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="space-y-2">
                    <Label for="name" required>Name</Label>
                    <InputText
                        v-model="form.name"
                        type="text"
                        :class="form.errors.name ? 'invalid-input-text' : ''"
                        size="small"
                        fluid
                        placeholder="Enter user name"
                    />
                    <InputError :message="form.errors.name" />
                </div>

                <!-- Email -->
                <div class="space-y-2">
                    <Label for="email" required>Email</Label>
                    <InputText
                        id="email"
                        v-model="form.email"
                        type="email"
                        fluid
                        class="input-text-no-border"
                        :class="form.errors.email ? 'invalid-input-text' : ''"
                        placeholder="Enter email address"
                        size="small"
                        required
                    />
                    <InputError :message="form.errors.email" />
                </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <Label for="password" required>Password</Label>
                <InputText
                    id="password"
                    v-model="form.password"
                    type="password"
                    fluid
                    :class="form.errors.password ? 'invalid-input-text' : ''"
                    placeholder="Enter password"
                    size="small"
                    required
                />
                <InputError :message="form.errors.password" />
            </div>

            <!-- Password Confirmation -->
            <div class="space-y-2">
                <Label for="password_confirmation" required>Confirm Password</Label>
                <InputText
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    fluid
                    :class="form.errors.password_confirmation ? 'invalid-input-text' : ''"
                    placeholder="Confirm password"
                    size="small"
                    required
                />
                <InputError :message="form.errors.password_confirmation" />
            </div>

            <!-- Role -->
            <div class="space-y-2">
                <Label for="role">Role</Label>
                <Select
                    v-model="form.role"
                    :options="roles"
                    optionLabel="name"
                    optionValue="code"
                    placeholder="All Role"
                    class="w-full"
                    size="small"
                    :showClear="true"
                    filter
                    filterPlaceholder="Search..."
                    :scrollHeight="'200px'"
                />
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
