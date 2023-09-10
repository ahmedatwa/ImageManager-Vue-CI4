// stores/button.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFilemanagerStore } from "./filemanager.ts";

export const usebuttonStore = defineStore("button", () => {
  // state
  const filemanager = useFilemanagerStore();
  const isFolder = ref(false);
  const folder = ref("");
  const isVisable = ref(false);
  const deletPath = ref([]);

  // getters
  const folderApiURL = computed((): string => {
    return filemanager.url + "/folder" + filemanager.token;
  });

  const deleteURL = computed((): string => {
    return filemanager.url + "/delete" + filemanager.token;
  });

  const uploadURL = computed((): string => {
    return filemanager.url + "/upload" + filemanager.token;
  });

  // Actions
  const goParent = (): void => {
    const path: string = filemanager.currentPath;

    if (path.length) {
      // remove Trailing Slash from path
      let str = path.replace(/\/+$/, "");
      let newResult = str.substring(0, str.lastIndexOf("/"));
      filemanager.getList(filemanager.apiUrlList, newResult);
    }
  };

  const doRefresh = () => {
    let path = filemanager.currentPath;
    if (path !== "") {
      filemanager.getList(
        filemanager.apiUrlList + "&directory=" + filemanager.currentPath
      );

      filemanager.currentPath = path;
    } else {
      filemanager.getList();
    }
  };

  const createFolder = () => {
    fetch(folderApiURL.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: folder.value,
        directory: filemanager.currentPath,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          isVisable.value = true;
          filemanager.message = [{ type: "danger", text: response.error }];
        }

        if (response.success) {
          isVisable.value = true;
          isFolder.value = false;
          folder.value = "";
          filemanager.message = [{ type: "success", text: response.success }];
          if (filemanager.currentPath) {
            filemanager.getList(
              filemanager.apiUrlList + "&directory=" + filemanager.currentPath
            );
          } else {
            filemanager.getList(filemanager.apiUrlList);
          }
        }
      })
      .catch((error) => {
        filemanager.message = [{ type: "danger", text: error }];
      });
  };

  const remove = () => {
    fetch(deleteURL.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: deletPath.value }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          isVisable.value = true;
          filemanager.message = [{ type: "danger", text: response.error }];
        }

        if (response.success) {
          isVisable.value = true;
          deletPath.value = [];
          filemanager.message = [{ type: "success", text: response.success }];
          filemanager.getList(
            filemanager.apiUrlList + "&directory=" + filemanager.currentPath
          );
        }
      })
      .catch((error) => {
        filemanager.message = [{ type: "danger", text: error }];
      });
  };

  const doUpload = (e: Event) => {
    let target = e.target as HTMLInputElement;

    if (!target.files) return;

    let formData = new FormData();
    formData.append("files", target.files[0]);

    fetch(uploadURL.value, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          isVisable.value = true;
          filemanager.message = [{ type: "danger", text: response.error }];
        }
        if (response.success) {
          isVisable.value = true;
          filemanager.message = [{ type: "success", text: response.success }];
          filemanager.getList(
            filemanager.apiUrlList + "&directory=" + filemanager.currentPath
          );
        }
      })
      .catch((error) => {
        [{ type: "danger", text: error }];
      });
  };

  return {
    goParent,
    doUpload,
    doRefresh,
    createFolder,
    remove,
    deletPath,
    isFolder,
    folder,
    isVisable,
  };
});
