<template>
	<div class="flex justify-end cursor-pointer w-[90%]">

		<button type="button" @click="emit('upload')"
		class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
		Upload
		<span v-if="selecteds?.length"
		class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
		{{ props.selecteds?.length || 0 }}
	</span>
</button>
</div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'upload'): void;
}>();
const props = defineProps<{
	selecteds: File[] | null;
}>()
</script>
