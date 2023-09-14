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
  const isVisableAlert = ref(false);
  const messages = ref<object>([]);

  type responseData = {
    name: string;
    href: string;
    type: string;
    path: string;
    thumb: string;
  };

  const data = ref<responseData[] | []>([]);

  const getUrlParam = (key: string): string | null | undefined => {
    let loc = location.toString();
    //?usertoken=1234&thumb=thumbparam&input=inputparam
    let parts: string[] | null = loc.split("?");

    if (parts.at(1)) {
      let searchParams = new URLSearchParams(parts.at(1));
      if (searchParams.has(key) !== false) {
        return searchParams.get(key);
      }
    }
  };

  const tokenUrlParam = computed(() => {
    if (getUrlParam(__CI_TOKEN__) !== undefined) {
      return "?" + getUrlParam(__CI_TOKEN__);
    } else {
      return "?";
    }
  });

  const thumbUrlParam = computed(() => {
    if (getUrlParam(__CI_THUMB__) !== undefined) {
      return "&" + getUrlParam(__CI_THUMB__);
    } else {
      return "";
    }
  });

  const inputUrlParam = computed(() => {
    if (getUrlParam(__CI_INPUT__) !== undefined) {
      return "&" + getUrlParam(__CI_INPUT__);
    } else {
      return "";
    }
  });

  // list api controller method
  const apiUrlList = computed((): string => {
    return __API_URL__ + "/list" + tokenUrlParam.value;
  });

  const totalPages = computed((): number => {
    return Math.ceil(data.value.length / perPage.value);
  });

  const filteredData = computed((): responseData[] => {
    if (data.value.length === 0) return [];
    return data.value
      .filter((item: responseData) => {
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
    console.log(path)
    if (typeof path !== 'undefined') {
      urlVal = apiUrlList.value + "&directory=" + path;
      currentPath.value = path;
    }

    try {
      const response = await fetch(urlVal);
      const resource = await response.json();
      data.value = resource;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      isVisableAlert.value = true;
      messages.value = { error: error };
    }
  };

  const nextPage = (): void => {
    if (currentPage.value * totalPages.value < filteredData.value.length)
      currentPage.value++;
  };
  const previousPage = (): void => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const paginate = (page: number): void => {
    currentPage.value = page;
  };

  return {
    tokenUrlParam,
    thumbUrlParam,
    inputUrlParam,
    data,
    totalPages,
    messages,
    filteredData,
    currentPage,
    currentPath,
    filtername,
    apiUrlList,
    perPage,
    isLoading,
    isVisableAlert,
    getList,
    previousPage,
    paginate,
    nextPage,
  };
});
