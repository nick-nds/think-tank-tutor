<script setup>
import { inject } from 'vue'

const attempted = inject('attempted')

</script>

<template>
  <div class="flex flex-wrap">
    <div class="m-4 border-2 p-3 rounded-lg bg-dark-800"
      :class="row.status ? 'border-accent-success bg-accent-success/5' : 'border-accent-error bg-accent-error/5'"
      v-for="row in attempted"
    >
      <span
        class="mx-4 text-lg font-semibold text-dark-100"
        v-for="col in row.expression"
      >{{ col }}</span>
    </div>
  </div>
</template>
