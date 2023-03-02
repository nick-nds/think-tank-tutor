<script setup>
import { inject } from 'vue'

const parameters = inject('parameters')

const setActiveCols = (index) => {
  parameters.value.cols = parameters.value.cols.map((col, i) => {
    return i == index ? !col : col
  })
}

</script>

<template>
  <div class="h-20 z-20 w-full border flex justify-around items-center">
    <div class="flex">
      <div 
        v-for="(cols, index) in parameters.cols"
        :class="cols ? 'border-green-500 shadow-lg shadow-green-500/50' : ''"
        class="w-16 mx-2 border border-2 text-center p-2 text-gray-200 hover:border-green-500 cursor-pointer"
        @click="setActiveCols(index)"
      >
        {{ parameters.defaultValue[index] }}
      </div>
    </div>
    <input type="text" placeholder="Size"
      :value="parameters.size"
      @keyup="parameters.size = $event.target.value"
          class="w-16 mx-1 text-center placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    />
    <MatrixMediaButtons />
  </div>
</template>
