<script setup lang="ts">
import { ref } from 'vue'
import { useFilemanagerStore } from '../store/filemanager.ts'
import { usebuttonStore } from '../store/button.ts'

const buttonStore = usebuttonStore()
const filemanagerStore = useFilemanagerStore()
const uploadInput = ref<null | { click: () => null }>(null)

const onUpload = (): void => {
  uploadInput.value?.click();
}

</script>

<template>
  <div class="col-5 mt-2">
    <div class="btn-group" role="group" aria-label="buttons Group">
      <button title="Parent" type="button" class="btn btn-light" @click="buttonStore.goParent"
        :disabled="!filemanagerStore.currentPath">
        <font-awesome-icon icon="arrow-up" />
      </button>
      <button title="Refresh" type="button" class="btn btn-light" @click="buttonStore.doRefresh">
        <font-awesome-icon icon="arrows-rotate" />
      </button>
      <button class="btn btn-primary" type="button" title="Create Folder"
        @click="buttonStore.isFolder = !buttonStore.isFolder">
        <font-awesome-icon icon="folder-plus" />
      </button>
      <button title="Upload" type="button" class="btn btn-light" @click="onUpload">
        <font-awesome-icon icon="file-arrow-up" />
      </button>

      <input ref="uploadInput" type="file" class="d-none" @input="buttonStore.doUpload" />

      <button title="Delete" type="button" class="btn btn-danger" @click="buttonStore.remove"
        :disabled="!buttonStore.deletPath.length"><font-awesome-icon icon="trash-can" /></button>
    </div>
  </div>
</template>

