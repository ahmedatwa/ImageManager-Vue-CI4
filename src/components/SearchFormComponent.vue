<script setup lang="ts">
import { useFilemanagerStore } from "@stores/filemanager.ts";

const filemanagerStore = useFilemanagerStore();
</script>

<template>
  <section class="col-7">
    <form>
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
        v-model="filemanagerStore.filtername"
      />
    </form>
  </section>
</template>
