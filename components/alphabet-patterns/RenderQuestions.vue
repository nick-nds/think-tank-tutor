<script setup>
import { inject } from 'vue'

/* const props = defineProps(['question']) */
const expressions = inject('expressions')
const attempted = inject('attempted')
const matrix = inject('matrix')
const parameters = inject('parameters')
const currentQuestion = computed(() => {
  return parameters.value.currentQuestion
})
const question = computed(() => {
  return currentQuestion.value < parameters.value.size ? expressions.value[currentQuestion.value] : []
})

const answer = computed(() => {
  return currentQuestion.value < parameters.value.size ? matrix.value[currentQuestion.value] : []
})

const inputWrapper = ref()

const focusIndex = ref(0)

watchEffect(() => {
  if(currentQuestion.value > -1 && question.value) {
    focusIndex.value = question.value.findIndex(q => {
      return q == null
    })
  }
})

const resultClass = ref('border-4 border-gray-400 shadow-[0_0_20px,inset_0_0_20px] shadow-gray-400')

const answered = (st) => {
  if(st === true) {
    resultClass.value = 'border-4 border-green-500 shadow-[0_0_20px,inset_0_0_20px] shadow-green-500'
  } else {
    resultClass.value = 'border-4 border-red-500 shadow-[0_0_20px,inset_0_0_20px] shadow-red-500'
  }
  setTimeout(() => {
    resultClass.value = 'border-4 border-gray-400 shadow-[0_0_20px,inset_0_0_20px] shadow-gray-400'
  }, 500)
}

const enterInput = (e) => {
  if(e.keyCode === 13) {
    next()
  }
}

const next = () => {
  focusIndex.value = (focusIndex.value + 1) % 3
  const children = [...inputWrapper.value.children]
  if(question.value[focusIndex.value] != null) {
    focusIndex.value = (focusIndex.value + 1) % 3
  }
  if(inputWrapper.value) {
    if(children.every(child => child.value)) {
      submitAnswer()
      return
    }
  }
  children[focusIndex.value].value = ''
}

const submitAnswer = () => {
  if(parameters.value.currentQuestion < parseInt(parameters.value.size)) {
    const attemptedAnswer = [...inputWrapper.value.children].map(child => child.value)
    const attemptedQuestion = [ ...answer.value ]
    const chk = attemptedAnswer.every((ans, index) => {
      if(isNaN(ans)) {
        ans = ans.toUpperCase()
      }
      return ans == answer.value[index]
    })
    answered(chk)
    parameters.value.currentQuestion += 1
    attempted.value = [
      {
        attempt: attemptedAnswer,
        expression: attemptedQuestion,
        status: chk
      },
      ...attempted.value,
    ]
    parameters.value.end = currentQuestion.value == parameters.value.size ? true : false
  }
}

watchEffect(() => {
  parameters.value.currentQuestion || true
  if(inputWrapper.value && focusIndex.value > -1) {
    const children = inputWrapper.value.children
    const focusedChild = children[focusIndex.value]
    focusedChild.focus()
  }
})


</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      v-if="parameters.currentQuestion > -1 && !parameters.paused && !parameters.end"
      :class="resultClass"
      class="transition-shadow duration-500 relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-lg sm-max-h-lg sm:w-full p-8 text-center"
    >
      <div ref="inputWrapper">
        <input type="text"
          v-for="(col, index) in parameters.cols"
          :value="question[index]"
          :readonly="question[index] ? true : false"
          @keyup="enterInput($event)"
          class="w-20 mx-4 text-center placeholder-gray-400/70 dark:placeholder-gray-500 text-5xl border-0 border-b border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 uppercase" />
      </div>
    </div>
    <div
      v-if="parameters.end && !parameters.paused"
      @click="parameters.currentQuestion = 0; parameters.end = false"
      class="border-4 border-gray-400 shadow-[0_0_20px,inset_0_0_20px] shadow-gray-400 cursor-pointer transition-shadow duration-500 z-60 text-gray-500 relative inline-block overflow-hidden align-bottom text-5xl transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-lg sm-max-h-lg sm:w-full p-8 text-center"
    >
      Restart
    </div>
  </div>
</template>
