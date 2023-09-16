// stores/button.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFilemanagerStore } from "@stores/filemanager.ts";

export const usebuttonStore = defineStore("button", () => {
  // state
  const filemanagerStore = useFilemanagerStore();
  const isFolder = ref(false);
  const deletPath = ref([]);
  const isSpinning = ref(false);

  // getters
  // create folder api controller method
  const createApiURL = computed((): string => {
    return __API_URL__ + "/folder" + filemanagerStore.tokenUrlParam;
  });

  // delete api controller method
  const deleteURL = computed((): string => {
    return __API_URL__ + "/doDelete" + filemanagerStore.tokenUrlParam;
  });

  // upload api controller method
  const uploadURL = computed((): string => {
    return __API_URL__ + "/upload" + filemanagerStore.tokenUrlParam;
  });

  // Actions
  const goParent = (): void => {
    const path: string = filemanagerStore.currentPath;

    if (path.length) {
      // remove Trailing Slash from path
      let str = path.replace(/\/+$/, "");
      let newResult = str.substring(0, str.lastIndexOf("/"));
      filemanagerStore.getList(filemanagerStore.apiUrlList, newResult);
    }
  };

  const doRefresh = (): void => {
    isSpinning.value = true;
    setTimeout(() => {
      isSpinning.value = false;
    }, 600);
    let path = filemanagerStore.currentPath;
    // clear Alerts
    filemanagerStore.messages = [];
    if (path !== "") {
      filemanagerStore.getList(
        filemanagerStore.apiUrlList,
        filemanagerStore.currentPath
      );

      filemanagerStore.currentPath = path;
    } else {
      filemanagerStore.getList();
    }
  };

  const createFolder = async (form: { folderName: string }): Promise<void> => {
    let response = await fetch(createApiURL.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: form.folderName,
        directory: filemanagerStore.currentPath,
      }),
    });

    let json = await response.json();

    if (response.status === 400) {
      filemanagerStore.isVisableAlert = true;
      filemanagerStore.messages = json.messages;
    }

    if (response.status === 200) {
      filemanagerStore.isVisableAlert = true;
      isFolder.value = false;
      // CI 404 reponse status is 200 for no controller method
      if (json.code === 404) {
        filemanagerStore.messages = { error: json.code + ": " + json.message };
      } else {
        filemanagerStore.messages = json;
      }
      filemanagerStore.getList(
        filemanagerStore.apiUrlList,
        filemanagerStore.currentPath
      );
    }
  };

  const remove = async (): Promise<void> => {
    let response = await fetch(deleteURL.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: deletPath.value }),
    });

    if (response.status === 400) {
      let data = await response.json();
      filemanagerStore.isVisableAlert = true;
      filemanagerStore.messages = data.messages;
    }

    if (response.status === 200) {
      let data = await response.json();

      filemanagerStore.isVisableAlert = true;
      deletPath.value = [];
      filemanagerStore.messages = data;
      filemanagerStore.getList(
        filemanagerStore.apiUrlList,
        filemanagerStore.currentPath
      );
    }
  };

  const doUpload = async (e: Event): Promise<void> => {
    let target = e.target as HTMLInputElement;

    if (!target.files) return;

    let formData = new FormData();
    formData.append("files", target.files[0]);
    formData.append("directory", filemanagerStore.currentPath);

    let response = await fetch(uploadURL.value, {
      method: "POST",
      body: formData,
    });
    if (response.status === 400) {
      let data = await response.json();
      filemanagerStore.isVisableAlert = true;
      filemanagerStore.messages = data.messages;
    }
    if (response.status === 200) {
      let data = await response.json();
      filemanagerStore.isVisableAlert = true;
      filemanagerStore.messages = data;
      filemanagerStore.getList(
        filemanagerStore.apiUrlList,
        filemanagerStore.currentPath
      );
    }
  };

  return {
    goParent,
    doUpload,
    doRefresh,
    createFolder,
    remove,
    isSpinning,
    deletPath,
    isFolder,
  };
});
