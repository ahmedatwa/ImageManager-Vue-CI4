// stores/button.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFilemanagerStore } from "@stores/filemanager.ts";

export const usebuttonStore = defineStore("button", () => {
  // state
  const filemanagerStore = useFilemanagerStore();
  const isFolder = ref(false);
  const folder = ref("");
  const isVisableAlert = ref(false);
  const deletPath = ref([]);

  // getters
  const createApiURL = computed((): string => {
    return __API_URL__ + "/createFolder" + filemanagerStore.token;
  });

  const deleteURL = computed((): string => {
    return __API_URL__ + "/doDelete" + filemanagerStore.token;
  });

  const uploadURL = computed((): string => {
    return __API_URL__ + "/upload" + filemanagerStore.token
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

  const createFolder = async (): Promise<void> => {
    let response = await fetch(createApiURL.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: folder.value,
        directory: filemanagerStore.currentPath,
      }),
    });

    if (response.status === 400) {
      let data = await response.json();
      isVisableAlert.value = true;
      filemanagerStore.messages = data.messages;
    }

    if (response.status === 200) {
      let data = await response.json();
      isVisableAlert.value = true;
      isFolder.value = false;
      folder.value = "";
      filemanagerStore.messages = data;
      if (filemanagerStore.currentPath) {
        filemanagerStore.getList(
          filemanagerStore.apiUrlList,
          filemanagerStore.currentPath
        );
      } else {
        filemanagerStore.getList(filemanagerStore.apiUrlList);
      }
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
      isVisableAlert.value = true;
      filemanagerStore.messages = data.messages;
    }

    if (response.status === 200) {
      let data = await response.json();

      isVisableAlert.value = true;
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
      body: formData
    });
    if (response.status === 400) {
      let data = await response.json();
      isVisableAlert.value = true;
      filemanagerStore.messages = data.messages;
    }
    if (response.status === 200) {
      let data = await response.json();
      isVisableAlert.value = true;
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
    deletPath,
    isFolder,
    folder,
    isVisableAlert,
  };
});
