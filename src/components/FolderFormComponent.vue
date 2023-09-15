<script setup lang="ts">
import { reactive } from "vue";

interface Form {
  folderName: string;
}

const form: Form = reactive({ folderName: "" });

const props = defineProps<{
  createFolder: Function;
}>();
</script>
<template>
  <div class="col-9 mb-4 m-auto" enctype="multipart/form-data">
    <form @submit.prevent="props.createFolder(form)" class="mt-2">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Add Folder"
          v-model="form.folderName"
        />
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="form.folderName.length < 3"
        >
          <font-awesome-icon icon="circle-plus" />
        </button>
      </div>
    </form>
  </div>
</template>
