<script setup lang="ts">
const props = defineProps<{
  filtername: string;
}>();
</script>

<template>
  <section id="search-form" class="col-4 my-2 me-1">
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
