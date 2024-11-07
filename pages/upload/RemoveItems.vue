<template>
	<template v-if="props.multiples">
		<hr class="h-[0.5px] bg-black w-[90%]">
		<h5 class="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-[90%]">Selected
			files</h5>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[90%]">
			<div v-for="(file, i) in selecteds" :key="i"
				class="flex items-center px-4 py-2 border border-gray-200 rounded dark:border-gray-700 relative text-sm">
				{{ file.name }}
				<button
					class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900 cursor-pointer"
					@click="emit('update', i)">
					X
				</button>
			</div>
		</div>
	</template>
</template>
<script setup lang="ts">
const emit = defineEmits<{
	(e: 'update', index: number): void;
}>();

const props = defineProps<{
	multiples: boolean;
	selecteds: File[] | null;
	selected: File | null;
}>()
</script>
