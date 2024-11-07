<template>
  <div class="flex flex-col gap-8 items-center justify-center w-full h-dvh">
    <form v-if="!showLoader" @submit="uploadMultiple" class="w-[90%]">
      <label for="dropzone-file"
        class="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <CaptionsUpload :selected="selected" :selecteds="selecteds" v-model:showErrorTypeFile="showErrorTypeFile" />
        <input id="dropzone-file" type="file" name='file' class="hidden" accept=".pdf" :multiple="isMultipleFiles"
          @change="onChooseOption" />
        </label>
      </form>
      <LoaderFiles v-else :message="messageLoader" />
      <div class="flex justify-between cursor-pointer w-[90%] items-center">
        <label id="labelfiles" for="multiple__files" class="flex cursor-pointer w-[90%]">
          <input type="checkbox" id="multiple__files" name="multiple__files" v-model="isMultipleFiles"
          class="sr-only peer">
          <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Multiple files</span>
      </label>
      <UploadButton v-if="selecteds?.length || selected?.name" :selecteds="selecteds" />
      </div>
    <RemoveItems :multiples="isMultipleFiles" :selected="selected" :selecteds="selecteds" @update="remove" />
  </div>
</template>
<script setup lang="ts">
import LoaderFiles from '~/components/LoaderFiles.vue';
import { handleDownload, isPDF } from '~/composables/useFiles.composable';
import { useGCPStore } from '~/stores/gcpStore';
import CounterFiles from './CounterFiles.vue'
import CaptionsUpload from './CaptionsUpload.vue'
import UploadButton from './UploadButton.vue'
import RemoveItems from './RemoveItems.vue';

const selected = ref<File | null>(null)
const selecteds = ref<File[] | null>(null)
const isMultipleFiles = ref<boolean>(false)
const gcpStore = useGCPStore()
const fileToDownload = ref<string>('')
const messageLoader = ref<string>('Processing file...')
const showLoader = ref<boolean>(false)

const remove = (order: number) => {
  if (isMultipleFiles.value) {
    selecteds.value?.splice(order, 1);
  }
  selected.value = null
}
const uploadMultiple = (e: Event) => {
  return isMultipleFiles.value ? HandleSubmitMultiple(e) : HandleSubmit(e)
}
const onChooseOption = (e: Event) => {
  return isMultipleFiles.value ? onChooseMultipleFiles(e) : onChooseFile(e)
}
const HandleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!selected) return;
  showLoader.value = true
  messageLoader.value = 'Processing file...'
  await gcpStore.setCors()
  const urlSigned = await gcpStore.postSigned(selected.value?.name!)

  const { url } = await fetch(urlSigned, {
    method: 'PUT',
    body: selected.value,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
  if (url) {
    fileToDownload.value = (url.split('?')[0]).split('_pdfs/')[1]
    messageLoader.value = 'Downloading file...'
    await handleDownload(url.split('?')[0], fileToDownload.value)
    selected.value = null
    fileToDownload.value = ''
  }
  showLoader.value = false
};

const HandleSubmitMultiple = async (event: Event) => {
  event.preventDefault();
  if (selecteds.value!.length < 0) return;
  showLoader.value = true
  messageLoader.value = 'Processing file...'
  await gcpStore.setCors()
  for (let index = selecteds.value!.length - 1; index >= 0; index--) {
    const element = selecteds.value![index];

    const urlSigned = await gcpStore.postSigned(element.name)

    const { url } = await fetch(urlSigned, {
      method: 'PUT',
      body: element,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    if (url) {
      fileToDownload.value = (url.split('?')[0]).split('_pdfs/')[1]
      messageLoader.value = 'Downloading file...'
      await handleDownload(url.split('?')[0], fileToDownload.value)
      selecteds.value?.splice(index, 1);
      fileToDownload.value = ''
    }
  }
  showLoader.value = false
};

const showErrorTypeFile = ref<boolean>(false)
const onChooseFile = (e: Event) => {
  const { files } = e.target as HTMLInputElement;

  // Verificar si existen archivos seleccionados
  if (!files || files.length === 0) {
    showErrorTypeFile.value = true;
    selected.value = null;
    return;
  }

  const selectedFile = files[0];

  // Verificar si el archivo es un PDF
  if (isPDF(selectedFile.type)) {
    showErrorTypeFile.value = false;
    selected.value = selectedFile;
  } else {
    showErrorTypeFile.value = true;
    selected.value = null;
  }
}

const onChooseMultipleFiles = (e: Event) => {
  const { files } = e.target as HTMLInputElement;

  if (!files || files.length === 0) {
    _resetFileSelection();
    return;
  }

  const selectedFiles = [] as File[]
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    if (isPDF(element.type)) {

      selectedFiles.push(element)
    }
  }
  if (selectedFiles.length < 1) {
    _resetFileSelection();
  } else {
    showErrorTypeFile.value = false;
    selecteds.value = selectedFiles
  }
}

const _resetFileSelection = () => {
  showErrorTypeFile.value = true;
  selected.value = null;
};

watch(
  () => isMultipleFiles.value,
  (newVal, oldVal) => {
    // update iframe if amount changes
    if (newVal === true) {
      selected.value = null
    }else {
      selecteds.value = null
    }
  }
)
</script>