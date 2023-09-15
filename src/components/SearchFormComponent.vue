<script setup lang="ts">
const props = defineProps<{
  filtername: string;
}>();
</script>

<template>
  <section class="col-7">
    <form>
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
        v-model="props.filtername"
      />
    </form>
  </section>
</template>
