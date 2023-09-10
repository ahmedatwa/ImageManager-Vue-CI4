<script setup lang="ts">
import { useFilemanagerStore } from '@stores/filemanager.ts'
import { usebuttonStore } from '@stores/button.ts'

const buttonStore = usebuttonStore()
const filemanagerStore = useFilemanagerStore()

</script>
<template>
    <div v-for="(row, index) in filemanagerStore.message" :key="index" v-if="buttonStore.isVisable"
        class="alert alert-dismissible fade show mt-2" role="alert" :class="[row.type ? `alert-${row.type}` : '']">
        {{ row.text }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="buttonStore.isVisable = false"
            aria-label="Close"></button>
    </div>
</template>