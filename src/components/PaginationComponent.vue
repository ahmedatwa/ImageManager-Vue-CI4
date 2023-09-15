<script setup lang="ts">
const props = defineProps<{
  previousPage: Function;
  nextPage: Function;
  paginate: Function;
  currentPage: number;
  totalPages: number;
}>();
</script>
<template>
  <section class="footer">
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            @click="props.previousPage"
            aria-label="Previous"
            :class="{ disabled: props.currentPage === 1 }"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="n in props.totalPages">
          <a
            href="#"
            :class="{ active: props.currentPage == n }"
            class="page-link"
            @click.prevent="props.paginate(n)"
            >{{ n }}</a
          >
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            @click="props.nextPage"
            aria-label="Next"
            :class="{ disabled: props.currentPage == props.totalPages }"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>