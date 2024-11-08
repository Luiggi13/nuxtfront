<template>
  <div class="flex flex-col gap-8 items-center justify-center w-full h-dvh">
    <HeaderIcon />
    <form v-if="!showLoader" @submit="HandleSubmitMultiple" class="w-[90%]">
      <label for="dropzone-file"
        class="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <CaptionsUpload :selected="selected" :selecteds="selecteds" v-model:showErrorTypeFile="showErrorTypeFile" />
        <input id="dropzone-file" type="file" name='file' class="hidden" accept=".pdf" :multiple="true"
          @change="onChooseOption" />
      </label>
    </form>
    <LoaderFiles v-else :message="messageLoader" />
    <div class="flex justify-end cursor-pointer w-[90%] items-center">
      <UploadButton v-if="selecteds?.length || selected?.name" :selecteds="selecteds" @upload="HandleSubmitMultiple" />
    </div>
    <RemoveItems :multiples="isMultipleFiles" :selecteds="selecteds" @update="remove" />
    <p @click="addFile()" class="cursor-pointer">
      {{ gettedFiles }}
    </p>
  </div>
</template>
<script setup lang="ts">
import LoaderFiles from '~/components/LoaderFiles.vue';
import { handleDownload, isPDF } from '~/composables/useFiles.composable';
import { useGCPStore } from '~/stores/gcpStore';
import { useFileStore } from '~/stores/downloadStore';
import CaptionsUpload from './CaptionsUpload.vue'
import UploadButton from './UploadButton.vue'
import RemoveItems from './RemoveItems.vue';
import HeaderIcon from './HeaderIcon.vue'

const selected = ref<File | null>(null)
const selecteds = ref<File[] | null>(null)
const isMultipleFiles = ref<boolean>(true)
const gcpStore = useGCPStore()
const fileStore = useFileStore();
const fileToDownload = ref<string>('')
const messageLoader = ref<string>('Processing file...')
const showLoader = ref<boolean>(false)

const remove = (order: number) => {
  if (isMultipleFiles.value) {
    selecteds.value?.splice(order, 1);
  }
  selected.value = null
}

const onChooseOption = (e: Event) => {
  return isMultipleFiles.value ? onChooseMultipleFiles(e) : onChooseFile(e)
} 
const addFile = () => {
  gettedFiles.value = fileStore.addFile('ejemplo')
}
const gettedFiles = ref<URLGCP[]>([])
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
      // fileStore.addFile((url.split('?')[0]).split('_pdfs/')[1])
      messageLoader.value = 'Downloading file...'
      // await handleDownload((url.split('?')[0]).split('_pdfs/')[1], fileToDownload.value)
      selecteds.value?.splice(index, 1);
      fileToDownload.value = ''
    }
  }
  selecteds.value = []
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
  fileStore.addFile('http://')
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
const supabase = useSupabaseClient()
</script>