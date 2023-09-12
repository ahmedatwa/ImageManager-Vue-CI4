<script setup lang="ts">
import { useFilemanagerStore } from '@stores/filemanager.ts'
import { usebuttonStore } from '@stores/button.ts'
import { onMounted } from 'vue';

const buttonStore = usebuttonStore()
const filemanagerStore = useFilemanagerStore()


onMounted(() => {
    setTimeout(() => {
        buttonStore.isVisableAlert = false
    }, 5000);
})

</script>
<template>
    <Transition name="slide-fade">
        <div>
        <div v-for="(message, index) in filemanagerStore.messages" :key="index"
            class="alert alert-dismissible fade show mt-2" role="alert"
            :class="[index === 'error' ? 'alert-danger' : 'alert-success']">
            {{ message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" @click="buttonStore.isVisableAlert = false"
                aria-label="Close"></button>
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