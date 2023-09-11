<script setup lang="ts">
import { ref } from 'vue'
import { useFilemanagerStore } from '@stores/filemanager.ts'
import { usebuttonStore } from '@stores/button.ts'

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
      <button title="Parent" type="button" class="btn btn-secondary" @click="buttonStore.goParent"
        :disabled="!filemanagerStore.currentPath">
        <font-awesome-icon icon="arrow-up" />
      </button>
      <button title="Refresh" type="button" class="btn btn-light" data-bs-toggle="tooltip" @click="buttonStore.doRefresh">
        <font-awesome-icon icon="arrows-rotate" />
      </button>
      <button class="btn btn-primary" type="button" title="Create Folder" data-bs-toggle="tooltip"
        @click="buttonStore.isFolder = !buttonStore.isFolder">
        <font-awesome-icon icon="folder-plus" /> </button>
      <button title="Upload" type="button" class="btn btn-light" data-bs-toggle="tooltip" @click="onUpload">
        <font-awesome-icon icon="upload" />
      </button>

      <input ref="uploadInput" type="file" class="d-none" @input="buttonStore.doUpload" />
      <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" data-bs-content="Delete">
        <button title="Delete" type="button" class="btn btn-danger" @click="buttonStore.remove"
          :disabled="!buttonStore.deletPath.length"><font-awesome-icon icon="trash-can" /></button>
      </span>
    </div>
  </div>
</template>

