<script setup lang="ts">
import AuthBase from '@/pages/layouts/GuestLayout.vue';
import InputError from '@/shared/components/InputError.vue';
import TextLink from '@/shared/components/TextLink.vue';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Head, useForm } from '@inertiajs/vue3';
import { KeyRound, LoaderCircle, Lock, Mail, User } from 'lucide-vue-next';

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
                <div class="relative">
                    <Label for="name" class="text-sm font-medium">Full Name</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <User class="h-4 w-4" />
                        </div>
                        <Input
                            id="name"
                            type="text"
                            required
                            autofocus
                            :tabindex="1"
                            autocomplete="name"
                            v-model="form.name"
                            placeholder="John Doe"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.name" />
                </div>

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
                            :tabindex="2"
                            autocomplete="email"
                            v-model="form.email"
                            placeholder="email@example.com"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <div class="relative">
                    <Label for="password" class="text-sm font-medium">Password</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <Lock class="h-4 w-4" />
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            :tabindex="3"
                            autocomplete="new-password"
                            v-model="form.password"
                            placeholder="Create a strong password"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.password" />
                </div>

                <div class="relative">
                    <Label for="password_confirmation" class="text-sm font-medium">Confirm Password</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <KeyRound class="h-4 w-4" />
                        </div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            :tabindex="4"
                            autocomplete="new-password"
                            v-model="form.password_confirmation"
                            placeholder="Confirm your password"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.password_confirmation" />
                </div>
            </div>

            <Button
                type="submit"
                class="mt-4 w-full rounded-md bg-primary py-2 text-base font-medium transition-colors hover:bg-primary/90"
                tabindex="5"
                :disabled="form.processing"
            >
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                <span v-else>Create Account</span>
            </Button>

            <div class="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?
                <TextLink :href="route('login')" class="ml-1 font-medium text-primary hover:underline" :tabindex="6">Sign in</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
