<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';

import DeleteUser from '@/modules/admin/components/DeleteUser.vue';
import { useProfileStore } from '@/modules/admin/stores/profile';
import { type BreadcrumbItem } from '@core/types';
import AdminLayout from '@modules/admin/layouts/AdminLayout.vue';
import SettingsLayout from '@modules/admin/layouts/SettingsLayout.vue';
import HeadingSmall from '@shared/components/HeadingSmall.vue';
import InputError from '@shared/components/InputError.vue';
import { Button } from '@shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown-menu';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { LoaderCircle, Trash2, Upload } from 'lucide-vue-next';

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

// Use profile store instead of local state
const profileStore = useProfileStore();

// Initialize form on component mount
onMounted(() => {
    profileStore.initializeForm();
});
</script>

<template>
    <AdminLayout :breadcrumbs="breadcrumbs">
        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form @submit.prevent="profileStore.submitProfile" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="avatar">Avatar</Label>
                        <div class="flex items-center space-x-4">
                            <div class="relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child :disabled="profileStore.isSubmitting">
                                        <button
                                            type="button"
                                            :disabled="profileStore.isSubmitting"
                                            class="group relative h-20 w-20 cursor-pointer overflow-hidden rounded-full bg-muted transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <img
                                                v-if="profileStore.hasAvatar"
                                                :src="profileStore.currentAvatarUrl || ''"
                                                alt="Avatar"
                                                class="h-20 w-20 object-cover"
                                            />
                                            <span v-else class="flex h-full w-full items-center justify-center text-sm text-muted-foreground"
                                                >No avatar</span
                                            >
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" class="w-48">
                                        <DropdownMenuItem @click="profileStore.selectImage" class="cursor-pointer">
                                            <Upload class="mr-2 h-4 w-4" />
                                            Select Image
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            @click="profileStore.removeAvatar"
                                            class="cursor-pointer text-destructive focus:text-destructive"
                                        >
                                            <Trash2 class="mr-2 h-4 w-4" />
                                            Remove Avatar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <!-- Hidden file input -->
                            <input
                                :ref="profileStore.setAvatarInputRef as any"
                                type="file"
                                accept="image/*"
                                @change="profileStore.handleAvatarChange"
                                class="hidden"
                            />
                        </div>
                        <InputError class="mt-2" :message="profileStore.form.errors.avatar" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" class="mt-1 block w-full" v-model="profileStore.form.name" autocomplete="name" placeholder="Full name" />
                        <InputError class="mt-2" :message="profileStore.form.errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="profileStore.form.email"
                            autocomplete="username"
                            placeholder="Email address"
                        />
                        <InputError class="mt-2" :message="profileStore.form.errors.email" />
                    </div>

                    <div v-if="mustVerifyEmail && !profileStore.user.email_verified_at">
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
                        <Button :disabled="profileStore.form.processing">
                            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" v-if="profileStore.form.processing" />
                            Save
                        </Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="profileStore.form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    </AdminLayout>
</template>
