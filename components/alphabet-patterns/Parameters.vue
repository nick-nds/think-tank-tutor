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
  <div class="h-20 z-20 w-full bg-dark-800 border-b border-dark-600 flex justify-around items-center">
    <div class="flex">
      <div 
        v-for="(cols, index) in parameters.cols"
        :class="cols ? 'border-accent-success bg-accent-success/10 shadow-lg shadow-accent-success/20' : 'border-dark-600 hover:border-accent-success/50'"
        class="w-16 mx-2 border-2 text-center p-2 text-dark-100 transition-all duration-200 cursor-pointer rounded-lg bg-dark-700 hover:bg-dark-600"
        @click="setActiveCols(index)"
      >
        {{ parameters.defaultValue[index] }}
      </div>
    </div>
    <input type="text" placeholder="Size"
      :value="parameters.size"
      @keyup="parameters.size = $event.target.value"
          class="input-field w-16 mx-1 text-center"
    />
    <AlphabetPatternsMediaButtons />
  </div>
</template>
