<script setup>
import { inject } from 'vue'
import { operators } from '@/components/operations/constants'

const props = defineProps(['expression'])

const expressions = inject('expressions')
const parameters = inject('parameters')
const actions = inject('actions')
const currentQuestion = computed(() => actions.value.currentQuestion)

const answerInput = ref('')

const inputAnswer = (e) => {
  if(e.keyCode === 13) {
    submitAnswer(e.target.value)
    answerInput.value = ''
  }
  const keyPress = (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 || e.which == 8 || e.which == 46 || e.which == 35 || e.which == 36 || e.which == 45)
  if (e.which == 17) {
    actions.value.direction = !actions.value.direction
  }

  if(!actions.value.direction && !keyPress) {
    if(e.target.createTextRange) {
      let part = inp.createTextRange()
      part.move("character", 0)
      part.select()
    } else if(e.target.setSelectionRange) {
      e.target.setSelectionRange(0, 0)
    }
    e.target.focus()
  }
}

const emit = defineEmits(['answered'])

const submitAnswer = (val) => {
  const ans = useRound(Number(val))
  if(ans == props.expression.value) {
    expressions.value[currentQuestion.value].status = true
    emit('answered', true)
  } else {
    emit('answered', false)
    expressions.value[currentQuestion.value].status = false
  }
  console.log("ans", ans)
  expressions.value[currentQuestion.value].answer = ans
  if(actions.value.currentQuestion == expressions.value.length - 1) {
    expressions.value = expressions.value.map(expression => {
      expression.status = null
      return expression
    })
    /* parameters.value.regenerate = !parameters.value.regenerate */
    /* actions.value.currentQuestion = -1 */
    /* actions.value.restart = true */
    actions.value.complete = true
  }
  actions.value.currentQuestion += 1
}

</script>

<template>
  <div class="mt-2 text-center">
    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
      Question {{ actions.currentQuestion + 1 }}:
    </h3>
    <div v-if="operators[props.expression.operator].svg_path" class="flex justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
      <span class="mx-4 text-xl font-bold">
        {{ props.expression.a }}
      </span>
      <span class="mx-4 text-xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
          class="w-6 h-6 stroke-0 fill-gray-500 dark:fill-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
            :d="operators[props.expression.operator].svg_path" />
        </svg>
      </span>
      <span class="mx-4 text-xl font-bold">
      {{ props.expression.b }}
      </span>
    </div>
    <div v-else class="flex justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
      <span v-html="operators[props.expression.operator].render(props.expression.a, props.expression.b)"></span>
    </div>
      <input type="text" placeholder="Answer"
        v-model="answerInput"
        class="w-30 mx-1 mt-2 placeholder-gray-400/70 dark:placeholder-gray-500 border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
        @keyup="inputAnswer($event)"
        @keydown="keyPress($event)"
      />
  </div>
</template>
