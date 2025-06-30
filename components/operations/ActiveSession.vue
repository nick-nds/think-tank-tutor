<script setup>
import { inject, computed, ref, watch, onMounted, nextTick } from 'vue'

const actions = inject('actions')
const expressions = inject('expressions')
const parameters = inject('parameters')

const userAnswer = ref('')
const showFeedback = ref(false)
const isCorrect = ref(false)
const answerInput = ref(null)

const currentExpression = computed(() => {
  return expressions.value[actions.value.currentQuestion] || null
})

const progress = computed(() => {
  const completed = expressions.value.filter(exp => exp.status !== null).length
  return (completed / parameters.value.size) * 100
})

const score = computed(() => {
  const correct = expressions.value.filter(exp => exp.status === true).length
  const total = expressions.value.filter(exp => exp.status !== null).length
  return total > 0 ? Math.round((correct / total) * 100) : 0
})

const submitAnswer = () => {
  if (!currentExpression.value || userAnswer.value === '') return
  
  const answer = parseFloat(userAnswer.value)
  const correct = Math.abs(answer - currentExpression.value.value) < 0.001
  
  isCorrect.value = correct
  showFeedback.value = true
  
  // Update expression status
  currentExpression.value.status = correct
  currentExpression.value.answer = answer
  
  // Auto-advance after feedback (faster for rapid-fire)
  setTimeout(() => {
    nextQuestion()
  }, 800)
}

const nextQuestion = () => {
  showFeedback.value = false
  userAnswer.value = ''
  
  if (actions.value.currentQuestion < parameters.value.size - 1) {
    actions.value.currentQuestion++
  } else {
    actions.value.complete = true
  }
  
  // Auto-focus answer input for rapid-fire practice
  nextTick(() => {
    if (answerInput.value) {
      answerInput.value.focus()
    }
  })
}

const skipQuestion = () => {
  if (currentExpression.value) {
    currentExpression.value.status = false
    currentExpression.value.answer = null
  }
  nextQuestion()
}

const getOperatorSymbol = (operator) => {
  const symbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    exponent: '^',
    root: '√'
  }
  return symbols[operator] || operator
}

const getHint = () => {
  if (!currentExpression.value) return ''
  
  const { a, b, operator } = currentExpression.value
  const hints = {
    add: `Think: ${a} + ${b} = ?`,
    subtract: `Think: ${a} - ${b} = ?`,
    multiply: `Think: ${a} × ${b} = ?`,
    divide: `Think: ${a} ÷ ${b} = ?`,
    exponent: `Think: ${a} to the power of ${b}`,
    root: `Think: ${b}th root of ${a}`
  }
  return hints[operator] || ''
}

// Watch for Enter key
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !showFeedback.value) {
    event.preventDefault()
    submitAnswer()
  }
}

// Auto-focus on mount and when question changes
onMounted(() => {
  nextTick(() => {
    if (answerInput.value) {
      answerInput.value.focus()
    }
  })
})

watch(() => actions.value.currentQuestion, () => {
  nextTick(() => {
    if (answerInput.value && !showFeedback.value) {
      answerInput.value.focus()
    }
  })
})
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header Stats -->
    <div class="bg-dark-800/30 backdrop-blur-sm border-b border-dark-600/30 p-2">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 gap-3 text-sm mb-3">
          <!-- Question Counter & Progress -->
          <div class="text-center">
            <div class="text-sm font-bold text-accent-primary mb-1">
              {{ actions.currentQuestion + 1 }}/{{ parameters.size }} ({{ Math.round(progress) }}%)
            </div>
            <div class="w-24 bg-dark-700 rounded-full h-1 mx-auto overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-accent-primary to-blue-600 transition-all duration-500 ease-out"
                :style="`width: ${progress}%`"
              ></div>
            </div>
          </div>
          
          <!-- Score -->
          <div class="text-center">
            <div class="text-sm font-bold text-accent-warning">
              {{ score }}%
            </div>
          </div>
        </div>
        
        <!-- Question Navigation -->
        <div class="flex justify-center space-x-1 overflow-x-auto">
          <div 
            v-for="(expr, index) in expressions" 
            :key="index"
            :class="[
              'w-5 h-5 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 flex-shrink-0',
              index === actions.currentQuestion 
                ? 'bg-accent-primary text-white ring-2 ring-accent-primary/50' 
                : expr.status === true
                ? 'bg-accent-success/20 text-accent-success'
                : expr.status === false
                ? 'bg-accent-error/20 text-accent-error'
                : 'bg-dark-600 text-dark-300'
            ]"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Question Area -->
    <div class="flex-1 flex items-center justify-center p-2 pb-4">
      <div class="max-w-xl mx-auto text-center w-full">
        <div v-if="currentExpression" class="space-y-4">
          <!-- Question Display -->
          <div class="surface-elevated p-3 animate-slide-up">
            
            <div class="text-2xl md:text-3xl font-bold text-dark-50 mb-3 font-mono">
              <span v-if="currentExpression.operator === 'root'">
                <sup class="text-lg md:text-xl">{{ currentExpression.b }}</sup>√{{ currentExpression.a }}
              </span>
              <span v-else-if="currentExpression.operator === 'exponent'">
                {{ currentExpression.a }}<sup class="text-lg md:text-xl">{{ currentExpression.b }}</sup>
              </span>
              <span v-else>
                {{ currentExpression.a }} {{ getOperatorSymbol(currentExpression.operator) }} {{ currentExpression.b }}
              </span>
            </div>

            <!-- Answer Input -->
            <div v-if="!showFeedback" class="space-y-2">
              <div class="relative max-w-xs mx-auto">
                <input
                  v-model="userAnswer"
                  @keydown="handleKeyPress"
                  type="number"
                  step="any"
                  placeholder="Answer"
                  class="input-field text-center text-lg w-full"
                  autocomplete="off"
                  ref="answerInput"
                >
              </div>
              
              <div class="flex justify-center">
                <button 
                  @click="submitAnswer"
                  :disabled="userAnswer === ''"
                  class="btn-primary text-xs px-4 py-1"
                  :class="{ 'opacity-50 cursor-not-allowed': userAnswer === '' }"
                >
                  Submit (Enter)
                </button>
              </div>
            </div>

            <!-- Feedback -->
            <div v-else class="space-y-1 animate-bounce-in">
              <div 
                :class="[
                  'text-lg font-bold',
                  isCorrect ? 'text-accent-success' : 'text-accent-error'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <svg v-if="isCorrect" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ isCorrect ? 'Correct!' : 'Wrong' }}</span>
                </div>
              </div>
              
              <div v-if="!isCorrect" class="text-dark-200 text-sm">
                Answer: <span class="font-bold text-accent-primary">{{ currentExpression.value }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Loading State -->
        <div v-else class="text-center py-12">
          <div class="spinner w-8 h-8 mx-auto mb-4"></div>
          <div class="text-dark-300">Loading next question...</div>
        </div>
      </div>
    </div>
  </div>
</template>