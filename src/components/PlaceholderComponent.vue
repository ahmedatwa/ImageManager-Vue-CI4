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
    <div class="overlay" v-if="props.isLoading">
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
.overlay {
  background: #333;
  color: #666666;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  float: left;
  text-align: center;
  padding-top: 35%;
  opacity: 0.5;
}
.loader {
  --d:22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #232047;
  box-shadow: 
    calc(1*var(--d))      calc(0*var(--d))     0 0,
    calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
    calc(0*var(--d))      calc(1*var(--d))     0 2px,
    calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
    calc(-1*var(--d))     calc(0*var(--d))     0 4px,
    calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
    calc(0*var(--d))      calc(-1*var(--d))    0 6px;
  animation: s7 1s infinite steps(8);
}

@keyframes s7 {
  100% {transform: rotate(1turn)}
}
</style>
