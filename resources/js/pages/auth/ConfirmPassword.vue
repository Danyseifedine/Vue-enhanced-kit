<script setup lang="ts">
import GuestLayout from '@core/layouts/GuestLayout.vue';
import InputError from '@core/components/InputError.vue';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Lock } from 'lucide-vue-next';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <GuestLayout
        title="Confirm your password"
        description="This is a secure area of the application. Please confirm your password before continuing."
        :show-logo="false"
    >
        <Head title="Confirm password" />

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="space-y-4">
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
                            autofocus
                            autocomplete="current-password"
                            v-model="form.password"
                            placeholder="Enter your password"
                            class="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <InputError :message="form.errors.password" />
                </div>

                <div class="pt-2">
                    <Button class="w-full" :disabled="form.processing">
                        <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                        Confirm Password
                    </Button>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>
