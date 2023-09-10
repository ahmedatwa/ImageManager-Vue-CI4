<script setup lang="ts">
import PlaceholderComponent from "@components/PlaceholderComponent.vue";
import FolderFormComponent from "@components/FolderFormComponent.vue";
import PaginationComponent from "@components/PaginationComponent.vue";
import SearchFormComponent from "@components/SearchFormComponent.vue";
import AlertComponent from "@components/AlertComponent.vue";
import ButtonGroupComponent from "./components/ButtonGroupComponent.vue";

import { ref, onMounted } from "vue";
import { useFilemanagerStore } from "@stores/filemanager.ts";
import { usebuttonStore } from "@stores/button.ts";

const filemanagerStore = useFilemanagerStore();
const buttonStore = usebuttonStore();
const title = ref(__APP_NAME__);
const appVersion = ref(__APP_VERSION__);

onMounted((): void => {
  filemanagerStore.getList();
});

const thumb = (url: string, path: string): void => {
  const imageSrc = document.getElementById(
    "thumb-image"
  ) as HTMLImageElement | null;
  const inputVal = document.getElementById(
    "input-image"
  ) as HTMLInputElement | null;

  if (imageSrc != null) {
    imageSrc.src = url;
  }
  if (inputVal != null) {
    inputVal.value = path;
  }
  let modal = document.getElementById("filemanagerModal") as HTMLDivElement;
  if (modal != null) {
    modal.style.display = "none";
  }
  let modalBackdrop = document.getElementsByClassName(
    "modal-backdrop"
  )[0] as HTMLDivElement;

  if (modalBackdrop) {
    modalBackdrop.remove();
  }

  const body = document.querySelector("body") as HTMLBodyElement;
  body.className === "modal-open" ?? "";
  body.style.overflow = "";
  body.style.padding = "";
};
</script>

<template>
  <div class="container mt-4">
    <h5>
      {{ title }} <small class="fw-light">{{ appVersion }}</small>
    </h5>
    <div class="row border-top pt-2">
      <ButtonGroupComponent></ButtonGroupComponent>
      <SearchFormComponent></SearchFormComponent>
      <AlertComponent></AlertComponent>
    </div>
    <FolderFormComponent></FolderFormComponent>
    <div class="container text-center">
      <div
        class="row row-cols-sm-3 row-cols-lg-4 px-1 mt-3 border-top pt-2 justify-content-md-center"
      >
        <PlaceholderComponent
          :is-loading="filemanagerStore.isLoading"
          :is-empty="!filemanagerStore.totalPages"
        >
        </PlaceholderComponent>

        <div
          v-for="(item, index) in filemanagerStore.filteredItem"
          :key="index"
        >
          <div
            v-if="item.type === 'directory'"
            :id="`row-directory-${index}`"
            class="mb-3"
          >
            <div class="mb-1">
              <a
                @click.prevent="filemanagerStore.getList(item.href, item.path)"
                class="directory"
              >
                <font-awesome-icon icon="folder" class="fa-5x text-primary" />
              </a>
            </div>
            <div class="form-check form-check-inline">
              <label
                class="form-check-label text-wrap"
                :for="`input-path-${index}`"
                >{{ item.name }}</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="buttonStore.deletPath"
                :value="item.path"
              />
            </div>
          </div>
          <!-- Images -->
          <div
            v-if="item.type === 'image'"
            :id="`row-image-${index}`"
            style="min-height: 100px"
            class="mb-3"
          >
            <div class="card border-0">
              <a @click.prevent="thumb(item.thumb, item.path)" class="image">
                <img
                  :src="item.thumb"
                  :alt="item.name"
                  :title="item.name"
                  class="img-thumbnail"
                />
              </a>
              <div class="card-body">
                <div class="form-check form-check-inline">
                  <label
                    class="form-check-label text-break"
                    :for="`input-path-${index}`"
                    >{{ item.name }}</label
                  >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="buttonStore.deletPath"
                    :value="item.path"
                  />
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
