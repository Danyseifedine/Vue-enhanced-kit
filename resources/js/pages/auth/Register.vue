<script setup lang="ts">
import BaseButton from '@/common/components/form/BaseButton.vue';
import BaseInput from '@/common/components/form/BaseInput.vue';
import { Head, useForm } from '@inertiajs/vue3';
import TextLink from '@shared/components/TextLink.vue';
import AuthBase from '@shared/layouts/GuestLayout.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AuthBase title="Join Us Today" description="Create your account in just a few steps" :show-logo="false">
        <Head title="Register" />

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="space-y-4">
                <BaseInput
                    label="Full Name"
                    id="name"
                    type="text"
                    :tabindex="1"
                    autocomplete="name"
                    v-model="form.name"
                    placeholder="John Doe"
                    :error="form.errors.name"
                />

                <BaseInput
                    label="Email Address"
                    id="email"
                    type="email"
                    :tabindex="2"
                    autocomplete="email"
                    v-model="form.email"
                    placeholder="email@example.com"
                    :error="form.errors.email"
                />

                <BaseInput
                    label="Password"
                    id="password"
                    type="password"
                    :tabindex="3"
                    autocomplete="new-password"
                    v-model="form.password"
                    placeholder="Create a strong password"
                    :error="form.errors.password"
                />

                <BaseInput
                    label="Confirm Password"
                    id="password_confirmation"
                    type="password"
                    :tabindex="4"
                    autocomplete="new-password"
                    v-model="form.password_confirmation"
                    placeholder="Confirm your password"
                    :error="form.errors.password_confirmation"
                />
            </div>

            <BaseButton type="submit" size="lg" class="mt-4 w-full" :loading="form.processing"> Create Account </BaseButton>

            <div class="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?
                <TextLink :href="route('login')" class="ml-1 font-medium text-primary hover:underline" :tabindex="6">Sign in</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
