<script setup>
import { inject } from 'vue'

/* const props = defineProps(['size']) */

const parameters = inject('parameters')

const updateSize = (value) => {
  const numValue = parseInt(value)
  if (!isNaN(numValue) && numValue > 0) {
    parameters.value.size = numValue
  }
}

</script>
<template>
  <div>
    <label for="length" class="block text-sm text-gray-500 dark:text-gray-300">Size</label>

    <input type="number" placeholder="Size" min="1"
      :value="parameters.size"
      @input="updateSize($event.target.value)"
      class="w-full mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
  </div>
</template>
