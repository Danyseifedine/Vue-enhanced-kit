<script setup lang="ts">
import GuestLayout from '@core/layouts/GuestLayout.vue';
import TextLink from '@core/components/TextLink.vue';
import { Button } from '@ui/button';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Mail } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};
</script>

<template>
    <GuestLayout
        title="Verify email"
        description="Please verify your email address by clicking on the link we just emailed to you."
        :show-logo="false"
    >
        <Head title="Email verification" />

        <div v-if="status === 'verification-link-sent'" class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit" class="space-y-6 text-center">
            <div class="flex justify-center">
                <Mail class="h-12 w-12 text-primary" />
            </div>

            <Button :disabled="form.processing" class="w-full">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                Resend verification email
            </Button>

            <TextLink :href="route('logout')" method="post" as="button" class="mx-auto block text-sm"> Log out </TextLink>
        </form>
    </GuestLayout>
</template>
