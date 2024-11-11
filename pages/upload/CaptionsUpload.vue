<template>
	<div class="flex flex-col items-center justify-center pt-5 pb-6">
		<svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
			fill="none" viewBox="0 0 20 16">
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
		</svg>
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span class="font-semibold">Click to upload</span> or
			drag and drop</p>
		<p class="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 100MB)</p>
		<p v-if="(!props.selected || !props.selecteds) && showErrorTypeFile"
			class="bg-red-300 text-black rounded-lg px-4 py-1 mt-2">El archivo no
			es un PDF, inténtalo de
			nuevo
		</p>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	selected: File|null;
	selecteds: File[]|null;
}>()
const showErrorTypeFile = defineModel<any>('showErrorTypeFile', { required: true })
</script>
