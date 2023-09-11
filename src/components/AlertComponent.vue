<script setup lang="ts">
import { useFilemanagerStore } from '@stores/filemanager.ts'
import { usebuttonStore } from '@stores/button.ts'

const buttonStore = usebuttonStore()
const filemanagerStore = useFilemanagerStore()




</script>
<template>
    <div v-for="(message, index) in filemanagerStore.messages" :key="index" class="alert alert-dismissible fade show mt-2"
        role="alert" :class="[index === 'error' ? 'alert-danger' : 'alert-success']">
        {{ message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="buttonStore.isVisableAlert = false"
            aria-label="Close"></button>
    </div>
</template>