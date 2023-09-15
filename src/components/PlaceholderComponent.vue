<script setup lang="ts">
import { ref } from "vue";

const textEmpty = ref("Directory is Empty.");

interface Props {
  isEmpty?: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEmpty: false,
  isLoading: false,
});
</script>

<template>
  <div class="d-flex justify-content-center" v-if="props.isEmpty">
    {{ textEmpty }}
  </div>
  <div id="overlay" v-if="props.isLoading">
    <div class="d-flex justify-content-center text-primary">
      <strong role="status">Loading...</strong>
      <div class="spinner-border" aria-hidden="true"></div>
    </div>
  </div>
</template>
<style scoped>
#overlay {
  background: #ffffff;
  color: #666666;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  float: left;
  text-align: center;
  padding-top: 25%;
  opacity: 0.8;
}
</style>
