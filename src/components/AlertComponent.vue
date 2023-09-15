<script setup lang="ts">
import { useFilemanagerStore } from "@stores/filemanager.ts";

const filemanagerStore = useFilemanagerStore();
</script>
<template>
  <Transition name="slide-fade">
    <div>
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
        <font-awesome-icon icon="circle-check" v-if="index !== 'error'" />
        {{ message }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          @click="filemanagerStore.isVisableAlert = false"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
