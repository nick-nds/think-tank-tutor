<script setup>
import { ref, inject } from 'vue'

const operations = ref({
  divide: {
    svg_path: "M272 96c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 320c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z",
    selected: false,
  },
  multiply: {
    svg_path: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" ,
    selected: false,
  },
  add: {
    svg_path: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" ,
    selected: false,
  },
  subtract: {
    svg_path: "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" ,
    selected: false,
  },
  exponent: {
    symbol: '<span class="p-2 text-lg font-extrabold">a<sup>b</sup></span>',
    selected: false,
  },
  root: {
    symbol: '<span class="p-2 text-lg font-extrabold"><sup>b</sup>&#8730;a</span>',
    selected: false,
  },
})

const selectedOperations = inject('selectedOperations')

const selectOperator = (key) => {
  if(operations.value[key].selected === true) {
    const index = selectedOperations.value.indexOf(key)
    if(index !== -1) {
      selectedOperations.value.splice(index, 1)
    }
  } else {
    selectedOperations.value.push(key)
  }
  operations.value[key].selected = !operations.value[key].selected 
}

</script>

<template>
  <div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
    <a class="my-4" href="#">
      <img class="w-auto h-6 rotate-90" src="https://img.logoipsum.com/289.svg" alt="">
    </a>

    <span v-for="(operation, key) in operations" :key="key"
      :class="operation.selected ? 'bg-blue-100 text-blue-500 dark-text-blue-400 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'"
      class="p-1.5 transition-colors duration-200 rounded-lg cursor-pointer"
      @click="selectOperator(key)"
    >
      <svg v-if="operation.svg_path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        :class="operation.selected ? 'fill-blue-500' : 'fill-gray-500'"
        class="w-6 h-6 stroke-0"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          :d="operation.svg_path" />
      </svg>
      <span v-else v-html="operation.symbol"></span>
    </span>

  </div>
</template>
