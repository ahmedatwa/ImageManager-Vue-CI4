<script setup lang="ts">
import PlaceholderComponent from "@components/PlaceholderComponent.vue";
import FolderFormComponent from "@components/FolderFormComponent.vue";
import PaginationComponent from "@components/PaginationComponent.vue";
import SearchFormComponent from "@components/SearchFormComponent.vue";
import AlertComponent from "@components/AlertComponent.vue";
import ButtonGroupComponent from "@components/ButtonGroupComponent.vue";

import { ref, onMounted } from "vue";
import { useFilemanagerStore } from "@stores/filemanager.ts";
import { usebuttonStore } from "@stores/button.ts";

const filemanagerStore = useFilemanagerStore();
const buttonStore = usebuttonStore();
const title = ref(__APP_NAME__);
const appVersion = ref(__APP_VERSION__);

onMounted(() => {
  filemanagerStore.getList();
});

// for CI to target the input and img element
const thumb = (url: string, path: string): void => {
  let parentDoc = window.parent.document as Document;
  let modal = parentDoc.getElementById("filemanagerModal") as HTMLDivElement;
  let imgThumbAttr = modal.getAttribute("data-filemanager-thumb") as string;
  let inputAttr = modal.getAttribute("data-filemanager-input") as string;
  const imageSrc = parentDoc.getElementById(
    imgThumbAttr
  ) as HTMLImageElement | null;
  const inputVal = parentDoc.getElementById(
    inputAttr
  ) as HTMLInputElement | null;

  // add vars to html element
  if (imageSrc !== null && inputVal !== null) {
    imageSrc.src = url;
    inputVal.value = path;
  }
  // remove bootstrap modal
  closeBsModal();
};

const closeBsModal = (): void => {
  let parentDoc = window.parent.document as Document;
  let modal = parentDoc.getElementById("filemanagerModal") as HTMLDivElement;
  // remove bootstrap modal
  let modalBackdrop = parentDoc.getElementsByClassName(
    "modal-backdrop"
  )[0] as HTMLDivElement;

  if (modal !== null && modalBackdrop !== null) {
    modalBackdrop.remove();
    modal.remove();
  }
  // clear body attrs
  const body = parentDoc.querySelector("body") as HTMLBodyElement;
  if (body.className === "modal-open") {
    body.className = "";
  }
  body.style.overflow = "";
  body.style.padding = "";
};
</script>

<template>
    <div class="title-container d-flex mt-2">
      <div class="me-auto p-2">
        <h5 class="modal-title">
          {{ title }} <small class="fw-light">{{ appVersion }}</small>
        </h5>
      </div>
      <div class="p-2">
        <button
          type="button"
          class="btn-close"
          @click="closeBsModal"
          aria-label="Close"
        ></button>
      </div>
    </div>
    <div class="container-fluid mt-2">
      <section class="row border-top border-bottom py-2">
        <ButtonGroupComponent
          :currentPath="filemanagerStore.currentPath"
        ></ButtonGroupComponent>
        <SearchFormComponent></SearchFormComponent>
        <AlertComponent v-if="filemanagerStore.isVisableAlert"></AlertComponent>
      </section>
      <FolderFormComponent
        v-if="buttonStore.isFolder"
        :create-folder="buttonStore.createFolder"
      ></FolderFormComponent>
      <div class="text-center px-1 mt-3 pt-2">
        <PlaceholderComponent
          v-if="filemanagerStore.isLoading || !filemanagerStore.totalPages"
          :is-loading="filemanagerStore.isLoading"
          :is-empty="!filemanagerStore.totalPages"
        >
        </PlaceholderComponent>
        <Transition name="fade">
        <div
          class="row row-cols-sm-3 row-cols-lg-4 mx-auto"
          v-if="filemanagerStore.filteredData.length"
        >
          <div
            id="filter-container"
            v-for="(item, index) in filemanagerStore.filteredData"
            :key="index"
          >
            <div
              v-if="item.type === 'directory'"
              :id="`row-directory-${index}`"
              class="mb-3"
            >
              <div class="mb-1">
                <a
                  @click.prevent="
                    filemanagerStore.getList(item.href, item.path)
                  "
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
      </Transition>
      </div>
      <PaginationComponent
        v-if="filemanagerStore.totalPages > 1"
        :currentPage="filemanagerStore.currentPage"
        :previousPage="filemanagerStore.previousPage"
        :nextPage="filemanagerStore.nextPage"
        :totalPages="filemanagerStore.totalPages"
        :paginate="filemanagerStore.paginate"
      ></PaginationComponent>
    </div>
  
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.card {
  width: 17rem;
}
</style>
