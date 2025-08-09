<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

import DeleteUser from '@/modules/admin/components/DeleteUser.vue';
import { type BreadcrumbItem, type SharedData, type User } from '@core/types';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import SettingsLayout from '@modules/admin/layouts/SettingsLayout.vue';
import HeadingSmall from '@shared/components/HeadingSmall.vue';
import InputError from '@shared/components/InputError.vue';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Edit, LoaderCircle } from 'lucide-vue-next';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

const page = usePage<SharedData>();
const user = page.props.auth.user as User;

const form = useForm({
    name: user.name,
    email: user.email,
    avatar: null as File | null,
});

const avatarInputRef = ref<HTMLInputElement | null>(null);

const handleAvatarChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.avatar = target.files[0];
    }
};

const triggerFileInput = () => {
    avatarInputRef.value?.click();
};

const submit = () => {
    form.post(route('admin.settings.profile.update'), {
        preserveScroll: true,
        forceFormData: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="breadcrumbs">
        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="avatar">Avatar</Label>
                        <div class="flex items-center space-x-4">
                            <div
                                class="group relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-visible rounded-full bg-muted"
                                @click="triggerFileInput"
                            >
                                <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar" class="h-full w-full rounded-full object-cover" />
                                <span v-else class="text-sm text-muted-foreground">No avatar</span>

                                <!-- Crayon icon overlay -->
                                <div
                                    class="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                >
                                    <Edit class="h-5 w-5 text-white" />
                                </div>

                                <!-- Small crayon icon in bottom right -->
                                <div
                                    class="absolute bottom-0 right-0 rounded-full border-2 border-background bg-primary p-1.5 text-primary-foreground shadow-md"
                                >
                                    <Edit class="h-3 w-3" />
                                </div>
                            </div>
                            <input ref="avatarInputRef" id="avatar" type="file" accept="image/*" @change="handleAvatarChange" class="hidden" />
                        </div>
                        <InputError class="mt-2" :message="form.errors.avatar" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" class="mt-1 block w-full" v-model="form.name" autocomplete="name" placeholder="Full name" />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="form.email"
                            autocomplete="username"
                            placeholder="Email address"
                        />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="-mt-4 text-sm text-muted-foreground">
                            Your email address is unverified.
                            <Link
                                :href="route('verification.send')"
                                method="post"
                                as="button"
                                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="form.processing">
                            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" v-if="form.processing" />
                            Save
                        </Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    </AdminLayout>
</template>
