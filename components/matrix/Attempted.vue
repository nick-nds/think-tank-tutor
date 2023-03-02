<script setup>
import { inject } from 'vue'

const attempted = inject('attempted')

</script>

<template>
  <div class="flex flex-wrap">
    <div class="m-4 border border-2 p-2"
      :class="row.status ? 'border-green-500' : 'border-red-500'"
      v-for="row in attempted"
    >
      <span
        class="mx-4 text-lg font-semibold text-gray-400"
        v-for="col in row.expression"
      >{{ col }}</span>
    </div>
  </div>
</template>
