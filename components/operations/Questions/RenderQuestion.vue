<script setup>
import { inject } from 'vue'
import { operators } from '@/components/operations/constants'

const props = defineProps(['expression'])

const expressions = inject('expressions')
const actions = inject('actions')
const currentQuestion = computed(() => actions.value.currentQuestion)

console.log("ex", props.expression)

const inputAnswer = (e) => {
  if(e.keyCode === 13) {
    submitAnswer(e.target.value)
  }
}

const submitAnswer = (val) => {
  const ans = useRound(Number(val))
  if(ans == props.expression.value) {
    console.log("correct")
    expressions.value[currentQuestion.value].status = true
  } else {
    expressions.value[currentQuestion.value].status = false
  }
  setTimeout(() => {
    actions.value.currentQuestion += 1
  }, 3000)
  console.log(ans, props.expression.value)
}

</script>

<template>
  <div class="mt-2 text-center">
    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
      Question {{ actions.currentQuestion + 1 }}:
    </h3>
    <div class="flex justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
      <span class="mx-4 text-xl font-bold">
        {{ props.expression.a }}
      </span>
      <span class="mx-4 text-xl font-bold">
        <svg v-if="operators[props.expression.operator].svg_path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
          class="w-6 h-6 stroke-0 fill-gray-500 dark:fill-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
            :d="operators[props.expression.operator].svg_path" />
        </svg>
        <span v-else v-html="operators[props.expression.operator].symbol"></span>
      </span>
      <span class="mx-4 text-xl font-bold">
      {{ props.expression.b }}
      </span>
    </div>
      <input type="text" placeholder="Answer"
        class="w-30 mx-1 mt-2 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
        @keyup="inputAnswer($event)"
      />
  </div>
</template>
