<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header class="not-has-[nav]:hidden mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
            <nav class="flex items-center justify-end gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="route('dashboard')"
                    class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="route('login')"
                        class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Log in
                    </Link>
                    <Link
                        :href="route('register')"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Register
                    </Link>
                </template>
            </nav>
        </header>
        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main class="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-lg lg:max-w-4xl lg:flex-row">
                <div class="flex-1 bg-white p-8 shadow-sm dark:bg-[#121212] lg:rounded-l-lg">
                    <div class="mb-8">
                        <h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome to Your Starter Kit</h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">Everything you need to build amazing web applications.</p>
                        <p class="mt-2 text-sm italic text-gray-500 dark:text-gray-400">Redesigned by Dany Seifeddine</p>
                    </div>

                    <div class="mb-8 grid gap-6 sm:grid-cols-2">
                        <div
                            class="rounded-md border border-gray-200 p-5 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:hover:border-indigo-500"
                        >
                            <h3 class="mb-2 flex items-center text-lg font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p class="text-md text-base dark:text-gray-400">bullet Stack</p>
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Laravel, Vue, Inertia, and Tailwind CSS for rapid development.</p>
                        </div>
                        <div
                            class="rounded-md border border-gray-200 p-5 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:hover:border-indigo-500"
                        >
                            <h3 class="mb-2 flex items-center text-lg font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p class="text-md text-base dark:text-gray-400">Authentication</p>
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Ready-to-use login, registration, and user management.</p>
                        </div>
                        <div
                            class="rounded-md border border-gray-200 p-5 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:hover:border-indigo-500"
                        >
                            <h3 class="mb-2 flex items-center text-lg font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p class="text-md text-base dark:text-gray-400">TypeScript</p>
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Type-safe code with better developer experience.</p>
                        </div>
                        <div
                            class="rounded-md border border-gray-200 p-5 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:hover:border-indigo-500"
                        >
                            <h3 class="mb-2 flex items-center text-lg font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                                <p class="text-md text-base dark:text-gray-400">Dark Mode</p>
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Built-in dark mode support for your applications.</p>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-4">
                        <a
                            href="https://laravel.com/docs"
                            class="inline-flex items-center rounded-md bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Laravel Docs
                        </a>
                        <a
                            href="https://vuejs.org/guide/introduction.html"
                            class="inline-flex items-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Vue Docs
                        </a>
                        <a
                            href="https://inertiajs.com/"
                            class="inline-flex items-center rounded-md bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Inertia.js
                        </a>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white lg:w-1/3 lg:rounded-r-lg">
                    <div class="mb-8 flex justify-center">
                        <div class="rounded-full bg-white/20 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-12 w-12">
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    <h2 class="mb-4 text-2xl font-bold">Get Started</h2>
                    <p class="mb-6">Begin building your next great project with this powerful starter kit.</p>

                    <div class="rounded-md bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
                        <p class="mb-2 font-mono text-sm">Ready to dive in?</p>
                        <code class="block font-mono text-xs">php artisan serve</code>
                    </div>
                </div>
            </main>
        </div>
        <div class="h-14.5 hidden lg:block"></div>
    </div>
</template>
