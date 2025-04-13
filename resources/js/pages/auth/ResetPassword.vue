<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { KeyRound, LoaderCircle, Lock, Mail } from 'lucide-vue-next';

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
                <div class="relative">
                    <Label for="email" class="text-sm font-medium">Email Address</Label>
                    <div class="mt-1 flex items-center rounded-md border border-input bg-background ring-offset-background">
                        <div class="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            <Mail class="h-4 w-4" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            autocomplete="email"
                            v-model="form.email"
                            readonly
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
                            autocomplete="new-password"
                            v-model="form.password"
                            autofocus
                            placeholder="New password"
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
                            autocomplete="new-password"
                            v-model="form.password_confirmation"
                            placeholder="Confirm password"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.password_confirmation" />
                </div>

                <div class="pt-2">
                    <Button class="w-full" :disabled="form.processing">
                        <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                        Reset Password
                    </Button>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>
