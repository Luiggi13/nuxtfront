<template>
    <div class="col-span-2 p-4 sm:ml-16 w-full h-full md:block hidden">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
            </div>
            <div class="flex items-center justify-center h-40 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <ClientOnly>
                    <p v-if="posts" class="py-2 px-4"> {{ posts.title }}</p>
                </ClientOnly>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
            </div>
            <div class="flex items-center justify-center h-40 mb-4 rounded bg-gray-50 dark:bg-gray-800"></div>
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { posts, getPosts } = usePostStore()
await getPosts()
</script>