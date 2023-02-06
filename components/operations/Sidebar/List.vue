<script setup>
import { inject } from 'vue'

const props = defineProps(['index', 'list'])

const parameters = inject('parameters')
const lists = inject('lists')

const changeList = (index, val) => {
  val = parseInt(val)
  lists.value[props.index][index] = val
}

</script>
<template>
  <div class="my-10">
    <div class="mb-10 flex flex-row justify-between">
      <span class="font-bold text-gray-900 dark:text-gray-300">
        List ({{ props.index }}): 
      </span>
      <div>
        <input type="text" placeholder="From"
          :value="parameters.range[props.index][0]"
          @keyup="parameters.range[props.index][0]=$event.target.value"
          class="w-24 mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
        />
        <input type="text" placeholder="To"
          :value="parameters.range[props.index][1]"
          @keyup="parameters.range[props.index][1]=$event.target.value"
          class="w-24 mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
        />
      </div>
    </div>
    <div class="flex flex-wrap">
      <p>
        <input 
          v-for="(value, index) in props.list"
          :key="index"
          @keyup="changeList(index, $event.target.value)"
          class="w-16 mx-1 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" type="text" :value="value" 
        />
      </p>
    </div>
  </div>
</template>
