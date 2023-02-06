<script setup>
import { inject } from 'vue'

const props = defineProps(['index', 'range'])

const parameters = inject('parameters')

</script>
<template>
  <div class="my-5">
    <label :for="'number-' + props.index" class="block text-sm text-gray-500 dark:text-gray-300">Range ({{ props.index }})</label>

    <input type="text" placeholder="From"
      :value="range[0]"
      @keyup="parameters.range[props.index][0]=$event.target.value"
      class="w-2/5 mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
    <input type="text" placeholder="To"
      :value="range[1]"
      @keyup="parameters.range[props.index][1]=$event.target.value"
      class="w-2/5 mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
  </div>
</template>

