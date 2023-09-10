<script setup lang="ts">
import PlaceholderComponent from "./components/PlaceholderComponent.vue"
import FolderFormComponent from "./components/FolderFormComponent.vue"
import PaginationComponent from "./components/PaginationComponent.vue"
import SearchFormComponent from "./components/SearchFormComponent.vue"
import AlertComponent from "./components/AlertComponent.vue"
import ButtonGroupComponent from "./components/ButtonGroupComponent.vue"

import { ref, onMounted } from 'vue'
import { useFilemanagerStore } from './store/filemanager.ts'
import { usebuttonStore } from './store/button.ts'

const filemanagerStore = useFilemanagerStore()
const buttonStore = usebuttonStore()
const title = ref('Filemanager')

onMounted((): void => {
  filemanagerStore.getList();
})

</script>

<template>
  <div class="container mt-4">
    <h5>{{ title }}</h5>
    <div class="row border-top pt-2">
      <ButtonGroupComponent></ButtonGroupComponent>
      <SearchFormComponent></SearchFormComponent>
      <AlertComponent></AlertComponent>
    </div>
    <FolderFormComponent></FolderFormComponent>
    <div class="container text-center">
      <div class="row row-cols-sm-3 row-cols-lg-4 px-1 mt-3 border-top pt-2 justify-content-md-center">
        <PlaceholderComponent :is-loading="filemanagerStore.isLoading" :is-empty="!filemanagerStore.totalPages">
        </PlaceholderComponent>

        <div v-for="(item, index) in filemanagerStore.filteredItem" :key="index">
          <div v-if="item.type === 'directory'" :id="`row-directory-${index}`" class="mb-3">
            <div class="mb-1">
              <a @click.prevent="filemanagerStore.getList(item.href, item.path)" class="directory">
                <font-awesome-icon icon="folder" class="fa-5x text-primary" />
              </a>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label text-wrap" :for="`input-path-${index}`">{{ item.name }}</label>
              <input class="form-check-input" type="checkbox" v-model="buttonStore.deletPath" :value="item.path" />
            </div>
          </div>
          <!-- Images -->
          <div v-if="item.type === 'image'" :id="`row-image-${index}`" style="min-height: 100px" class="mb-3">
            <div class="card border-0">
              <a :href="item.href" class="image">
                <img :src="item.thumb" :alt="item.name" :title="item.name" class="img-thumbnail" />
              </a>
              <div class="card-body">
                <div class="form-check form-check-inline">
                  <label class="form-check-label text-break" :for="`input-path-${index}`">{{ item.name }}</label>
                  <input class="form-check-input" type="checkbox" v-model="buttonStore.deletPath" :value="item.path" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationComponent></PaginationComponent>
  </div>
</template>