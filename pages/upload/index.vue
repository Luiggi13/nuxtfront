<template>
  <div class="flex flex-col gap-8 items-center justify-center w-full h-dvh">
    <HeaderIcon />
    <form v-if="!showLoader" @submit="HandleSubmitMultiple" class="w-[90%]">
      <label for="dropzone-file"
        class="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <CaptionsUpload :selected="selected" :selecteds="selecteds" v-model:showErrorTypeFile="showErrorTypeFile" />
        <input id="dropzone-file" type="file" name='file' class="hidden" accept=".pdf" :multiple="true"
          @change="onChooseMultipleFiles" />
      </label>
    </form>
    <LoaderFiles v-else :message="messageLoader" />
    <div class="flex justify-end cursor-pointer w-[90%] items-center">
      <UploadButton v-if="selecteds?.length || selected?.name" :selecteds="selecteds" @upload="HandleSubmitMultiple" />
    </div>
    <RemoveItems :multiples="isMultipleFiles" :selecteds="selecteds" @update="remove" />
  </div>
</template>
<script setup lang="ts">
import LoaderFiles from '~/components/LoaderFiles.vue';
import { isPDF } from '~/composables/useFiles.composable';
import { useGCPStore } from '~/stores/gcpStore';
import { useDownloadStore } from '~/stores/downloadStore';
import CaptionsUpload from './CaptionsUpload.vue'
import UploadButton from './UploadButton.vue'
import RemoveItems from './RemoveItems.vue';
import HeaderIcon from './HeaderIcon.vue'
import type { Complete, InsertDownload } from '~/server/api/downloads/insert.post';

const selected = ref<File | null>(null)
const selecteds = ref<File[] | null>(null)
const isMultipleFiles = ref<boolean>(true)
const gcpStore = useGCPStore()
const downloadStore = useDownloadStore()
const fileToDownload = ref<string>('')
const messageLoader = ref<string>('Processing file...')
const showLoader = ref<boolean>(false)

const remove = (order: number) => {
  if (isMultipleFiles.value) {
    selecteds.value?.splice(order, 1);
  }
  selected.value = null
}

const HandleSubmitMultiple = async (event?: Event) => {
  event?.preventDefault();
  if (selecteds.value!.length < 0) return;
  showLoader.value = true
  messageLoader.value = 'Processing file...'
  await gcpStore.setCors()
  for (let index = selecteds.value!.length - 1; index >= 0; index--) {
    const element = selecteds.value![index];
    const myNewFiles: File = new File([element], hashDate() + '.pdf', { type: element?.type })

    const urlSigned = await gcpStore.postSigned(myNewFiles.name)

    const { url } = await fetch(urlSigned, {
      method: 'PUT',
      body: myNewFiles,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    if (url) {
      fileToDownload.value = (url.split('?')[0]).split('_pdfs/')[1]
      urls.value.push(fileToDownload.value)
      messageLoader.value = 'Compressing files...'
      selecteds.value?.splice(index, 1);
      fileToDownload.value = ''
    }
  }
  await insertFake()
  selecteds.value = []
  showLoader.value = false
  navigateTo('/compressed')
};

const showErrorTypeFile = ref<boolean>(false)
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

    if (newVal === true) {
      selected.value = null
    } else {
      selecteds.value = null
    }
  }
)

const hashDate = ():string => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();


  return `modified_${dd}${mm}${yyyy}_${Math.round(new Date().getTime() / 1000)}`
}
const urls = ref<string[]>([])
const insertFake = async () => {
  const data: Complete<InsertDownload>[] = [];
    for (let index = 0; index < urls.value.length; index++) {
      const element = urls.value[index];
      data.push(
        {
        userid: window.crypto.randomUUID(),
        download_url:element,
        active: true,
        downloads: 0,
        fetched: false
      })
    }
  await downloadStore.insertDocumentDB(data)
}
</script>