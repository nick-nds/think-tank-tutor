<script setup>
import { inject } from 'vue'

const actions = inject('actions')
const expressions = inject('expressions')

const restart = () => {
  expressions.value = expressions.value.map(expression => {
    expression.status = null
    return expression
  })
  actions.value.restart = true
}

</script>
<template>
  <div class="flex flex-column justify-start">
    <div @click="restart()" class="cursor-pointer flex group">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        class="w-6 h-6 stroke-0 fill-rose-900"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M447.5 224H456c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L397.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L311 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H447.5z" />
      </svg>
      <span class="text-rose-900 font-bold trasition-all opacity-0 duration-500 group-hover:translate-x-4 group-hover:opacity-100">Restart</span>
    </div>
  </div>
</template>
