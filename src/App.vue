<script setup lang="ts">
import PlaceholderComponent from "@components/PlaceholderComponent.vue";
import FolderFormComponent from "@components/FolderFormComponent.vue";
import PaginationComponent from "@components/PaginationComponent.vue";
import SearchFormComponent from "@components/SearchFormComponent.vue";
import AlertComponent from "@components/AlertComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";

import { ref, onMounted } from "vue";
import { useFilemanagerStore } from "@stores/filemanager.ts";
import { usebuttonStore } from "@stores/button.ts";
import { useFileDialog } from "@vueuse/core";

const filemanagerStore = useFilemanagerStore();
const buttonStore = usebuttonStore();
const title = ref(__APP_NAME__);
const appVersion = ref(__APP_VERSION__);

onMounted(() => {
  filemanagerStore.getList();
});

const { open, onChange } = useFileDialog();
onChange((files: FileList | null) => {
  buttonStore.upload(files);
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
  <main>
    <div class="container-lg">
      <div class="card mb-3 border border-top-0">
        <div class="d-flex mx-6 mt-2 bg-light border-bottom">
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

        <section class="d-flex border-bottom">
          <div id="button-group" class="col my-2 ms-1">
            <ButtonComponent :id="'refresh'" @click="buttonStore.doRefresh"
              ><font-awesome-icon icon="arrows-rotate" />
              Refresh</ButtonComponent
            >
            <ButtonComponent
              :id="'Create Folder'"
              :class="'btn btn-primary'"
              @click="buttonStore.createFolder"
            >
              <font-awesome-icon icon="folder-plus" /> Create
              Folder</ButtonComponent
            >
            <ButtonComponent :id="'Upload'" @click="open">
              <font-awesome-icon icon="upload" /> Upload</ButtonComponent
            >
            <ButtonComponent
              :id="'Delete'"
              :class="'btn btn-danger'"
              @click="buttonStore.remove"
            >
              <font-awesome-icon icon="trash-can" /> Delete</ButtonComponent
            >
          </div>
          <SearchFormComponent
            :filtername="filemanagerStore.filtername"
          ></SearchFormComponent>
        </section>

        <div class="row g-0">
          <div class="col-md-4">
            <ul class="list-group list-group-flush">
              <li class="list-group-item disabled" aria-disabled="true">
                A disabled item
              </li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
            </ul>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <!-- breadcrumb -->
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <!-- sort -->

              <!-- toggle icons/list -->
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <PaginationComponent
                  :previousPage="filemanagerStore.previousPage"
                  :nextPage="filemanagerStore.nextPage"
                  :paginate="filemanagerStore.paginate"
                  :currentPage="filemanagerStore.currentPage"
                  :totalPages="filemanagerStore.totalPages"
                ></PaginationComponent>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
