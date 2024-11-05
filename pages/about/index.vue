<template>
    <div class="w-full flex gap-4 min-h-dvh h-dvh">
        <div class="w-96 p-4 bg-white flex-col justify-start items-start gap-6 inline-flex">
            <div class="w-full justify-between items-center gap-2.5 inline-flex">
                <a href="#">
                    <img src="https://pagedone.io/asset/uploads/1701235273.png" alt="Pagedone logo image" width="103"
                        height="34" />
                </a>
                <a href="#" class="w-6 h-6 relative bg-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu">
                            <rect width="24" height="24" fill="white" />
                            <path id="icon" d="M13 6H21M3 12H21M7 18H21" stroke="#1F2937" stroke-width="1.1"
                                stroke-linecap="round" />
                        </g>
                    </svg>
                </a>
            </div>
            <div class="w-full">
                <div class="w-full h-8 px-3 items-center flex">
                    <h6 class="text-gray-500 text-xs font-semibold leading-4">MENU</h6>
                </div>
                <ul class="flex-col gap-1 flex">
                    <li v-for="(menu, idx) in menus" :key="idx">
                        <NuxtLink :to="menu.link">
                            <div class="flex-col flex px-3 py-1 bg-white rounded-lg">
                                <div class="h-5 gap-3 flex">
                                    <div class="relative">
                                        <div> 🚀 </div>
                                    </div>
                                    <h2 class="text-gray-500 text-sm font-medium leading-snug">{{ menu.text }}</h2>
                                </div>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-span-2 p-4 sm:ml-16 w-full h-full md:block hidden">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
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
                <div class="flex items-center justify-center h-40 mb-4 rounded bg-gray-50 dark:bg-gray-800"></div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
type itemsMenu = {
        link: string;
        icon: string;
        text: string;
    }
    const menus: itemsMenu[] = [
            {
                link: "/upload",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><g id="Upload 02"><path id="icon" d="M8.1475 12.6968L9.99935 10.8333L11.8512 12.6968M9.99935 17.5V10.8795M5.36972 13.6805H4.92701C3.12601 13.6805 1.66602 12.2205 1.66602 10.4196C1.66602 8.61855 3.12601 7.15855 4.92701 7.15855V7.15855C5.17151 7.15855 5.36753 6.95973 5.39031 6.71629C5.61168 4.35087 7.59071 2.5 9.99935 2.5C12.5562 2.5 14.629 4.5857 14.629 7.15855H15.0717C16.8727 7.15855 18.3327 8.61855 18.3327 10.4196C18.3327 12.2205 16.8727 13.6805 15.0717 13.6805H14.629" stroke="#6B7280" strokeWidth="2.6" strokeLinecap="round" /></g></svg>',
                text: "Upload ↑"
            },
            {
                link: "/compressed",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><g id="Upload 02"><path id="icon" d="M8.1475 12.6968L9.99935 10.8333L11.8512 12.6968M9.99935 17.5V10.8795M5.36972 13.6805H4.92701C3.12601 13.6805 1.66602 12.2205 1.66602 10.4196C1.66602 8.61855 3.12601 7.15855 4.92701 7.15855V7.15855C5.17151 7.15855 5.36753 6.95973 5.39031 6.71629C5.61168 4.35087 7.59071 2.5 9.99935 2.5C12.5562 2.5 14.629 4.5857 14.629 7.15855H15.0717C16.8727 7.15855 18.3327 8.61855 18.3327 10.4196C18.3327 12.2205 16.8727 13.6805 15.0717 13.6805H14.629" stroke="#6B7280" strokeWidth="2.6" strokeLinecap="round" /></g></svg>',
                text: "Compressed"
            },
            {
                link: "/processed",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><g id="Upload 02"><path id="icon" d="M8.1475 12.6968L9.99935 10.8333L11.8512 12.6968M9.99935 17.5V10.8795M5.36972 13.6805H4.92701C3.12601 13.6805 1.66602 12.2205 1.66602 10.4196C1.66602 8.61855 3.12601 7.15855 4.92701 7.15855V7.15855C5.17151 7.15855 5.36753 6.95973 5.39031 6.71629C5.61168 4.35087 7.59071 2.5 9.99935 2.5C12.5562 2.5 14.629 4.5857 14.629 7.15855H15.0717C16.8727 7.15855 18.3327 8.61855 18.3327 10.4196C18.3327 12.2205 16.8727 13.6805 15.0717 13.6805H14.629" stroke="#6B7280" strokeWidth="2.6" strokeLinecap="round" /></g></svg>',
                text: "Processed"
            }
        ]
</script>