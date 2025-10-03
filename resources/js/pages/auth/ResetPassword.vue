<script setup lang="ts">
import BaseButton from '@/common/components/dashboards/form/BaseButton.vue';
import BaseInput from '@/common/components/dashboards/form/BaseInput.vue';
import { Head, useForm } from '@inertiajs/vue3';
import GuestLayout from '@shared/layouts/GuestLayout.vue';

interface Props {
    token: string;
    email: string;
}

const props = defineProps<Props>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <GuestLayout title="Reset password" description="Please enter your new password below" :show-logo="false">
        <Head title="Reset password" />

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="space-y-4">
                <BaseInput
                    label="Email Address"
                    id="email"
                    type="email"
                    :tabindex="1"
                    autocomplete="email"
                    v-model="form.email"
                    placeholder="email@example.com"
                    :error="form.errors.email"
                />

                <BaseInput
                    label="Password"
                    id="password"
                    type="password"
                    :tabindex="2"
                    autocomplete="new-password"
                    v-model="form.password"
                    placeholder="New password"
                    :error="form.errors.password"
                />

                <BaseInput
                    label="Confirm Password"
                    id="password_confirmation"
                    type="password"
                    :tabindex="3"
                    autocomplete="new-password"
                    v-model="form.password_confirmation"
                    placeholder="Confirm password"
                    :error="form.errors.password_confirmation"
                />

                <BaseButton type="submit" size="lg" class="w-full" :loading="form.processing"> Reset Password </BaseButton>
            </div>
        </form>
    </GuestLayout>
</template>
