<script setup lang="ts">
import AuthBase from '@/pages/layouts/GuestLayout.vue';
import InputError from '@/shared/components/InputError.vue';
import TextLink from '@/shared/components/TextLink.vue';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Lock, Mail } from 'lucide-vue-next';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AuthBase title="Welcome Back" description="Sign in to continue to your account" :show-logo="false">
        <Head title="Log in" />

        <div
            v-if="status"
            class="mb-6 rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
        >
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="space-y-4">
                <div class="relative">
                    <Label for="email" class="text-sm font-medium">Email address</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <Mail class="h-4 w-4" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            required
                            autofocus
                            :tabindex="1"
                            autocomplete="email"
                            v-model="form.email"
                            placeholder="email@example.com"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <div class="relative">
                    <div class="flex items-center justify-between">
                        <Label for="password" class="text-sm font-medium">Password</Label>
                        <TextLink v-if="canResetPassword" :href="route('password.request')" class="text-xs font-medium hover:underline" :tabindex="5">
                            Forgot password?
                        </TextLink>
                    </div>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <Lock class="h-4 w-4" />
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            :tabindex="2"
                            autocomplete="current-password"
                            v-model="form.password"
                            placeholder="••••••••"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.password" />
                </div>

                <div class="flex items-center justify-between" :tabindex="3">
                    <Label for="remember" class="flex items-center space-x-2 text-sm">
                        <Checkbox id="remember" v-model:checked="form.remember" :tabindex="4" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <Button
                    type="submit"
                    class="mt-4 w-full rounded-md bg-primary py-2 text-base font-medium transition-colors hover:bg-primary/90"
                    tabindex="5"
                    :disabled="form.processing"
                >
                    <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    <span>Sign In</span>
                </Button>
            </div>

            <div class="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?
                <TextLink :href="route('register')" class="ml-1 font-medium text-primary hover:underline" :tabindex="6">Create an account</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
