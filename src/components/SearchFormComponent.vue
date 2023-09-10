<script setup lang="ts">
import { useFilemanagerStore } from '@stores/filemanager.ts'

const filemanagerStore = useFilemanagerStore()

</script>

<template>
    <div class="col-7">
        <form>
        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="Search..."
                v-model="filemanagerStore.filtername">
            <label for="floatingInput">Search...</label>
        </div>
    </form>
    </div>
</template>