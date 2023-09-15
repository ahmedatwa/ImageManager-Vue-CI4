<script setup lang="ts">
import { useFilemanagerStore } from "@stores/filemanager.ts";

const filemanagerStore = useFilemanagerStore();
</script>
<template>
  <Transition name="slide-fade">
    <section>
      <div
        v-for="(message, index) in filemanagerStore.messages"
        :key="index"
        class="alert alert-dismissible fade show mt-2"
        role="alert"
        :class="[index === 'error' ? 'alert-danger' : 'alert-success']"
      >
        <font-awesome-icon
          icon="triangle-exclamation"
          v-if="index === 'error'"
        />
        <font-awesome-icon icon="circle-check" v-else />
        {{ message }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          @click="filemanagerStore.isVisableAlert = false"
          aria-label="Close"
        ></button>
      </div>
    </section>
  </Transition>
</template>