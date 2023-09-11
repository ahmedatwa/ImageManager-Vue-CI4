// stores/filemanager.ts
import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useFilemanagerStore = defineStore("filemanager", () => {
  // state
  const currentPath = ref("");
  const filtername = ref("");
  const perPage = ref(9);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const data = ref<any[]>([]);
  const messages = ref<object>([]);

  // getters
  const token = computed((): string => {
    let url: string = location.toString();

    let query: string[] = url.split("?");
    let userToken: string[] = query.filter((word: string) => {
      return word.includes("usertoken");
    });
    if (userToken[0]) {
      return "?" + userToken[0];
    } else {
      return "?";
    }
  });

  const apiUrlList = computed((): string => {
    return __API_URL__ + "/list" + token.value;
  });

  const totalPages = computed((): number => {
    return Math.ceil(data.value.length / perPage.value);
  });

  const filteredItem = computed((): any => {
    if (!data.value) return;
    return data.value
      .filter((item: any) => {
        return item.name.toLowerCase().includes(filtername.value.toLowerCase());
      })
      .filter((_, index: number) => {
        let start = (currentPage.value - 1) * perPage.value;
        let end = currentPage.value * perPage.value;
        if (index >= start && index < end) return true;
      });
  });

  // reset current page on status change
  watch(
    [() => filtername.value, () => currentPath.value],
    ([__newFilter, __newPath]) => {
      currentPage.value = 1;
    }
  );

  // actions
  const getList = async (
    urlVal: string = apiUrlList.value,
    path?: string
  ): Promise<void> => {
    isLoading.value = true;
    if (typeof path !== "undefined") {
      urlVal = apiUrlList.value + "&directory=" + path;
      currentPath.value = path;
    }

    try {
      const response = await fetch(urlVal);
      const resource = await response.json();
      data.value = resource;
      isLoading.value = false;
    } catch (error) {
      messages.value = { error: error };
    }
  };

  const nextPage = (): void => {
    if (currentPage.value * totalPages.value < filteredItem.value.length)
      currentPage.value++;
  };
  const previousPage = (): void => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const paginate = (page: number): void => {
    currentPage.value = page;
  };

  return {
    token,
    data,
    totalPages,
    messages,
    filteredItem,
    currentPage,
    currentPath,
    filtername,
    apiUrlList,
    perPage,
    isLoading,
    getList,
    previousPage,
    paginate,
    nextPage,
  };
});
