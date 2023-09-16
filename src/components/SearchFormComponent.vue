<script setup lang="ts">
import { useFilemanagerStore } from "@stores/filemanager.ts";

const filemanagerStore = useFilemanagerStore();

</script>

<template>
  <section class="col-7 mt-2">
    <form enctype="multipart/form-data">
      <input
        type="text"
        class="form-control float-right mr-11"
        placeholder="Search..."
        v-model="filemanagerStore.filtername"
      />
    </form>
  </section>
</template>
<style scoped>
.mr-11 {
  margin-right: 11px;
}
</style>
