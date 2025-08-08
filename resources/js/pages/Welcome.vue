<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@shared/layouts/GuestLayout.vue';

defineOptions({
    layout: GuestLayout,
});
</script>

<template>
    <Head title="Welcome" />
    <div class="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h1 class="text-3xl font-bold mb-2">Welcome to the Starter Kit</h1>
        <p class="text-gray-500 mb-6">Please log in or register to continue.</p>
        <div class="flex gap-4">
            <Link
                href="/login"
                class="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
                Login
            </Link>
            <Link
                href="/register"
                class="px-6 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
            >
                Register
            </Link>
        </div>
    </div>
</template>
