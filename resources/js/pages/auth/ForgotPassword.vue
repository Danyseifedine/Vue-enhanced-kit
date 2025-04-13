<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Mail } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <GuestLayout title="Forgot password" description="Enter your email to receive a password reset link" :show-logo="false">
        <Head title="Forgot password" />

        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="space-y-4">
                <div class="relative">
                    <Label for="email" class="text-sm font-medium">Email Address</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <Mail class="h-4 w-4" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            required
                            autofocus
                            autocomplete="email"
                            v-model="form.email"
                            placeholder="email@example.com"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <div class="pt-2">
                    <Button class="w-full" :disabled="form.processing">
                        <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                        Email password reset link
                    </Button>
                </div>
            </div>
        </form>

        <div class="mt-6 text-center text-sm text-muted-foreground">
            <span>Or, return to </span>
            <TextLink :href="route('login')">log in</TextLink>
        </div>
    </GuestLayout>
</template>
