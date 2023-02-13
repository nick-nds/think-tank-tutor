<script setup>
import { operators } from '@/components/operations/constants'

import { inject, computed, onMounted } from 'vue'

const expressions = inject('expressions')
const actions = inject('actions')

const attempted = computed(() => {
  if(expressions.value.length > 0) {
    return expressions.value.slice(0, actions.value.currentQuestion)
  }
  return attempted.value
})

</script>

<template>
  <div class="grid grid-cols-4 gap-4 justify-items-center h-full overflow-y-auto auto-cols-max">
    <div 
      v-for="(expression, index) in attempted.slice().reverse()"
      :key="index"
      :class="expression.status === true ? 'border-green-500' : 'border-red-500'" 
      class="text-center border-4 py-8 rounded-md text-gray-500 dark:text-gray-400 h-fit"
    >
      <p>Question {{ attempted.length - index }}</p>
      <div v-if="operators[expression.operator].svg_path" class="flex justify-center h-fit mt-4 px-10 text-sm">
        <span class="text-xl font-bold">
          {{ expression.a }}
        </span>
        <span class="mx-1 text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
            class="w-6 h-6 stroke-0 fill-gray-500 dark:fill-gray-400"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
              :d="operators[expression.operator].svg_path" />
          </svg>
        </span>
        <span class="mx-1 text-xl font-bold">
        {{ expression.b }}
        </span>
        <span class="mx-1 text-xl font-bold">
          =
        </span>
        <span class="mx-1 text-xl font-bold">
          {{ expression.value }}
        </span>
      </div>
      <div v-else class="flex justify-between justify-around justify-center mt-4 text-sm">
        <span v-html="operators[expression.operator].render(expression.a, expression.b)"></span>
        <span class="mx-1 text-xl font-bold">
          =
        </span>
        <span class="mx-1 text-xl font-bold">
          {{ expression.value }}
        </span>
      </div>
      <p 
        :class="expression.status === true ? 'text-green-500' : 'text-red-500'" 
        class="mt-2"
      >
        Answered: <span>{{ expression.answer }}</span>
      </p>
    </div>
  </div>
</template>
