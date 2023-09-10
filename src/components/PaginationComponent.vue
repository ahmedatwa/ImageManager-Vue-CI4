<script setup lang="ts">
import { useFilemanagerStore } from '@stores/filemanager.ts'

const filemanagerStore = useFilemanagerStore()
</script>
<template>
    <div class="modal-footer">
        <nav v-if="filemanagerStore.totalPages > 1">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" @click="filemanagerStore.previousPage" aria-label="Previous"
                        :class="{ 'disabled': filemanagerStore.currentPage === 1 }">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="n in filemanagerStore.totalPages">
                    <a href="#" :class="{ 'active': filemanagerStore.currentPage == n }" class="page-link"
                        @click.prevent="filemanagerStore.paginate(n)">{{
                            n
                        }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" @click="filemanagerStore.nextPage" aria-label="Next"
                        :class="{ 'disabled': filemanagerStore.currentPage == filemanagerStore.totalPages }">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>