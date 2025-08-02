<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/core/layouts/GuestLayout.vue';

defineOptions({
    layout: GuestLayout,
});
</script>

<template>
    <Head title="Welcome" />

    <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <img
            id="background"
            class="absolute -left-20 top-0 max-w-[877px]"
            src="https://laravel.com/assets/img/welcome/background.svg"
        />
        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white"
        >
            <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                <header class="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                    <div class="flex lg:justify-center lg:col-start-2">
                        <svg
                            class="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
                            viewBox="0 0 62 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m61.1409 13.6052-12.345-12.345-35.2118 35.2118-12.345-12.3449L13.585 12.2702l23.9569-23.9569L61.1409 13.6052z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <nav class="-mx-3 flex flex-1 justify-end">
                        <Link
                            :href="route('admin.dashboard')"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </header>

                <main class="mt-6">
                    <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        <div
                            class="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >
                            <h2 class="text-xl font-semibold text-black dark:text-white">Enterprise Ready</h2>
                            <p class="mt-4 text-sm/relaxed">
                                This starter kit is built with scalability in mind. Features are organized by domain,
                                with proper separation of concerns and a clean architecture that can grow with your team.
                            </p>
                        </div>

                        <div
                            class="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >
                            <h2 class="text-xl font-semibold text-black dark:text-white">Multi-Dashboard Support</h2>
                            <p class="mt-4 text-sm/relaxed">
                                Easily create multiple dashboard types with different layouts, navigation, and 
                                configurations. Perfect for admin panels, user dashboards, and specialized interfaces.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>