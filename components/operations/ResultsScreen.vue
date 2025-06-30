<script setup>
import { inject, computed, ref, onMounted } from 'vue'

const expressions = inject('expressions')
const actions = inject('actions')
const parameters = inject('parameters')

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 200)
})

const stats = computed(() => {
  const total = expressions.value.length
  const correct = expressions.value.filter(exp => exp.status === true).length
  const incorrect = expressions.value.filter(exp => exp.status === false).length
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  
  return {
    total,
    correct,
    incorrect,
    accuracy
  }
})

const performance = computed(() => {
  const accuracy = stats.value.accuracy
  if (accuracy >= 90) return { 
    level: 'Excellent', 
    color: 'text-accent-success', 
    bg: 'bg-accent-success/10', 
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  }
  if (accuracy >= 80) return { 
    level: 'Great', 
    color: 'text-accent-primary', 
    bg: 'bg-accent-primary/10', 
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  }
  if (accuracy >= 70) return { 
    level: 'Good', 
    color: 'text-accent-warning', 
    bg: 'bg-accent-warning/10', 
    icon: 'M7 11.5a5.5 5.5 0 1111 0M7 7a1 1 0 112 0v4a1 1 0 11-2 0V7zM14 7a1 1 0 112 0v4a1 1 0 11-2 0V7z'
  }
  if (accuracy >= 60) return { 
    level: 'Fair', 
    color: 'text-orange-400', 
    bg: 'bg-orange-400/10', 
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
  }
  return { 
    level: 'Keep Practicing', 
    color: 'text-accent-error', 
    bg: 'bg-accent-error/10', 
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
})

const operationStats = computed(() => {
  const operationCounts = {}
  expressions.value.forEach(exp => {
    if (!operationCounts[exp.operator]) {
      operationCounts[exp.operator] = { total: 0, correct: 0 }
    }
    operationCounts[exp.operator].total++
    if (exp.status === true) {
      operationCounts[exp.operator].correct++
    }
  })
  
  return Object.entries(operationCounts).map(([op, data]) => ({
    operation: op,
    ...data,
    accuracy: Math.round((data.correct / data.total) * 100)
  }))
})

const restart = () => {
  expressions.value = expressions.value.map(expression => {
    expression.status = null
    expression.answer = null
    return expression
  })
  actions.value.restart = true
  actions.value.complete = false
}

const startNew = () => {
  parameters.value.regenerate = !parameters.value.regenerate
  actions.value.currentQuestion = -1
  actions.value.complete = false
}

const getOperationName = (op) => {
  const names = {
    add: 'Addition',
    subtract: 'Subtraction',
    multiply: 'Multiplication',
    divide: 'Division',
    exponent: 'Exponents',
    root: 'Roots'
  }
  return names[op] || op
}

const getOperationSymbol = (op) => {
  const symbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    exponent: '^',
    root: '√'
  }
  return symbols[op] || op
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border-b border-dark-600/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
        <div :class="isLoaded ? 'animate-bounce-in' : 'opacity-0'">
          <div class="mb-3">
            <svg :class="[performance.color, 'w-10 h-10 sm:w-12 sm:h-12 mx-auto']" fill="currentColor" viewBox="0 0 20 20">
              <path :d="performance.icon"></path>
            </svg>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-dark-50 mb-2">Session Complete!</h1>
          <p class="text-sm sm:text-base text-dark-200 mb-4">Great job on your rapid practice session</p>
        </div>
      </div>
    </div>

    <!-- Main Stats -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <!-- Overall Performance -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.2s;" class="text-center mb-6 sm:mb-8">
        <div :class="[performance.bg, 'rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-sm mx-auto']">
          <div :class="[performance.color, 'text-xl sm:text-2xl font-bold mb-1']">{{ stats.accuracy }}%</div>
          <div :class="[performance.color, 'text-sm sm:text-base font-medium mb-1']">{{ performance.level }}</div>
          <div class="text-dark-300 text-xs">Overall Accuracy</div>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto">
          <div class="surface-elevated p-3 sm:p-4 text-center">
            <div class="text-lg sm:text-xl font-bold text-accent-success mb-1">{{ stats.correct }}</div>
            <div class="text-dark-300 text-xs">Correct</div>
          </div>
          <div class="surface-elevated p-3 sm:p-4 text-center">
            <div class="text-lg sm:text-xl font-bold text-accent-error mb-1">{{ stats.incorrect }}</div>
            <div class="text-dark-300 text-xs">Incorrect</div>
          </div>
          <div class="surface-elevated p-3 sm:p-4 text-center">
            <div class="text-lg sm:text-xl font-bold text-accent-primary mb-1">{{ stats.total }}</div>
            <div class="text-dark-300 text-xs">Total</div>
          </div>
        </div>
      </div>

      <!-- Operation Breakdown -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.4s;" class="mb-6 sm:mb-8">
        <h2 class="text-lg sm:text-xl font-bold text-dark-50 text-center mb-3 sm:mb-4">Performance by Operation</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <div 
            v-for="opStat in operationStats" 
            :key="opStat.operation"
            class="surface-elevated p-3 sm:p-4 text-center"
          >
            <div class="text-xl sm:text-2xl font-bold mb-1">{{ getOperationSymbol(opStat.operation) }}</div>
            <div class="text-xs sm:text-sm font-semibold text-dark-100 mb-1 sm:mb-2">{{ getOperationName(opStat.operation) }}</div>
            <div class="text-sm sm:text-lg font-bold mb-1" :class="{
              'text-accent-success': opStat.accuracy >= 80,
              'text-accent-warning': opStat.accuracy >= 60 && opStat.accuracy < 80,
              'text-accent-error': opStat.accuracy < 60
            }">
              {{ opStat.accuracy }}%
            </div>
            <div class="text-dark-300 text-xs">{{ opStat.correct }}/{{ opStat.total }}</div>
          </div>
        </div>
      </div>

      <!-- Question Review -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.6s;" class="mb-6 sm:mb-8">
        <h2 class="text-lg sm:text-xl font-bold text-dark-50 text-center mb-3 sm:mb-4">Question Review</h2>
        <div class="max-w-3xl mx-auto space-y-2">
          <div 
            v-for="(expr, index) in expressions" 
            :key="index"
            :class="[
              'surface-elevated p-2 sm:p-3 flex items-center justify-between',
              expr.status ? 'border-l-4 border-accent-success' : 'border-l-4 border-accent-error'
            ]"
          >
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-xs font-bold" :class="{
                'bg-accent-success/20 text-accent-success': expr.status,
                'bg-accent-error/20 text-accent-error': !expr.status
              }">
                {{ index + 1 }}
              </div>
              <div class="font-mono text-sm sm:text-base">
                <span v-if="expr.operator === 'root'">
                  <sup class="text-xs">{{ expr.b }}</sup>√{{ expr.a }}
                </span>
                <span v-else-if="expr.operator === 'exponent'">
                  {{ expr.a }}<sup class="text-xs">{{ expr.b }}</sup>
                </span>
                <span v-else>
                  {{ expr.a }} {{ getOperationSymbol(expr.operator) }} {{ expr.b }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-xs sm:text-sm" :class="{
                'text-accent-success': expr.status,
                'text-accent-error': !expr.status
              }">
                {{ expr.answer !== null ? expr.answer : 'Skip' }}
              </div>
              <div class="text-xs text-dark-400">
                {{ expr.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'" style="animation-delay: 0.8s;" class="text-center pb-6">
        <div class="space-y-4 max-w-md mx-auto">
          <!-- Primary Actions -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              @click="restart" 
              class="bg-gradient-to-r from-accent-primary to-blue-600 hover:from-blue-600 hover:to-accent-primary text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-accent-primary/25 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 touch-manipulation"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
              </svg>
              <span>Try Again</span>
            </button>
            
            <button 
              @click="startNew" 
              class="bg-dark-600 hover:bg-dark-500 text-dark-100 px-6 py-3 rounded-xl transition-all duration-300 font-medium border border-dark-500 hover:border-dark-400 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 touch-manipulation"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
              </svg>
              <span>New Session</span>
            </button>
          </div>
          
          <!-- Secondary Action -->
          <div class="pt-2">
            <NuxtLink 
              to="/" 
              class="text-dark-200 hover:text-dark-50 px-6 py-3 rounded-xl transition-all duration-300 font-medium hover:bg-dark-700/50 border border-transparent hover:border-dark-600 inline-flex items-center gap-2 touch-manipulation"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
              </svg>
              <span>Back to Home</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>