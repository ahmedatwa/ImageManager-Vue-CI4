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
  <section class="centerd">
    <div v-if="props.isEmpty">
      {{ textEmpty }}
    </div>
    <div v-if="props.isLoading">
      <span class="loader"></span>
    </div>
  </section>
</template>
<style scoped>
.centerd {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #1e91cf;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: #1e91cf;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
