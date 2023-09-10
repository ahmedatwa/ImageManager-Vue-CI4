<script setup lang="ts">
import { usebuttonStore } from '../store/button.ts'

const buttonStore = usebuttonStore()

</script>

<template>
    <div class="col-9 mb-4 m-auto" v-if="buttonStore.isFolder" enctype="multipart/form-data">
        <form @submit.prevent="buttonStore.createFolder" class="mt-2">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Add Folder" v-model="buttonStore.folder" />
                <button class="btn btn-primary" type="submit" :disabled="buttonStore.folder.length < 3">
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
        </form>
    </div>
</template>