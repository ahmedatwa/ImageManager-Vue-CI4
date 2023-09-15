<script setup lang="ts">
const props = defineProps<{
  filtername: string;
}>();
</script>

<template>
  <div class="col-7">
    <form>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="Search..."
          v-model="props.filtername"
        />
        <label for="floatingInput">Search...</label>
      </div>
    </form>
  </div>
</template>
