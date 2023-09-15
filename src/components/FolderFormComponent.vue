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
  <section class="col-9 mb-4 m-auto">
    <form @submit.prevent="props.createFolder(form)" enctype="multipart/form-data">
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
  </section>
</template>