<script setup lang="ts">
import { ref } from "vue";
import { usebuttonStore } from "@stores/button.ts";

const props = defineProps<{
  currentPath: string;
}>();

const buttonStore = usebuttonStore();
const uploadInput = ref<null | { click: () => null }>(null);

const onUpload = (): void => {
  uploadInput.value?.click();
};
</script>

<template>
  <section class="col-5 mt-2">
      <span class="d-inline-block" tabindex="0" v-tooltip:arrow="'Parent'">
        <button
          type="button"
          class="btn btn-secondary border mr-2"
          @click="buttonStore.goParent"
          :disabled="props.currentPath.indexOf('/') === -1"
        >
          <font-awesome-icon icon="arrow-up" />
        </button>
      </span>
      <button
        v-tooltip:arrow="'Refresh'"
        type="button"
        class="btn btn-light border mr-2"
        @click="buttonStore.doRefresh"
      > 

      <font-awesome-icon icon="arrows-rotate" spin v-if="buttonStore.isSpinning"/>
      <font-awesome-icon icon="arrows-rotate" v-else/>
      </button>
      <button
        class="btn btn-primary border mr-2"
        type="button"
        v-tooltip:arrow="'Create Folder'"
        @click="buttonStore.isFolder = !buttonStore.isFolder"
      >
        <font-awesome-icon icon="folder-plus" />
      </button>
      <button
        v-tooltip:arrow="'Upload'"
        type="button"
        class="btn btn-light border mr-2"
        @click="onUpload"
      >
        <font-awesome-icon icon="upload" />
      </button>

      <input
        ref="uploadInput"
        type="file"
        class="d-none"
        @input="buttonStore.doUpload"
      />

      <span class="d-inline-block" tabindex="0" v-tooltip:arrow="'Delete'">
        <button
          title="Delete"
          type="button"
          class="btn btn-danger border"
          @click="buttonStore.remove"
          :disabled="!buttonStore.deletPath.length"
        >
          <font-awesome-icon icon="trash-can" />
        </button>
      </span>
    </section>
</template>
<style scoped>
.mr-2 {
  margin-right: 2px;
}
</style>