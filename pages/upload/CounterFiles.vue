<template>
	<div
		class="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
		{{ props.selecteds?.length || 0 }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	selecteds: File[] | null;
}>()
</script>
