import { createApp } from "vue";
import { createPinia } from "pinia";
import { createTooltip } from './directives/tooltip.ts'
import App from "./App.vue";


/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faArrowUp,
  faArrowsRotate,
  faUpload,
  faTrashCan,
  faFolder,
  faFolderPlus,
  faCirclePlus
);

const app = createApp(App);
const pinia = createPinia();
app.directive('tooltip', createTooltip )
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#filemanagerApp");
