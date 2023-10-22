<script setup lang="ts">
interface Props {
  id: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "button",
  class: "btn btn-light",
});
</script>

<template>
  <button
    v-tooltip:arrow="props.id"
    type="button"
    :id="props.id"
    :class="props.class"
  >
    <slot></slot>
  </button>
</template>
