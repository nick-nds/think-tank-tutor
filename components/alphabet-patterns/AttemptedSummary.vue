<script setup>
import { inject, computed, ref } from 'vue'

const attempted = inject('attempted')
const parameters = inject('parameters')

const stats = computed(() => {
  const total = attempted.value.length
  const correct = attempted.value.filter(attempt => attempt.correct).length
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  
  return {
    total,
    correct,
    accuracy
  }
})

const recentAttempts = computed(() => {
  return attempted.value.slice(-5).reverse()
})

const isExpanded = ref(false)
</script>

<template>
  <div class="bg-dark-800/90 backdrop-blur-sm rounded-xl border border-dark-600/50 shadow-xl min-w-80 max-w-sm">
    <!-- Header -->
    <div class="p-4 border-b border-dark-600/30">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-dark-100">Session Progress</h3>
        <button 
          @click="isExpanded = !isExpanded"
          class="text-dark-400 hover:text-dark-200 transition-colors"
        >
          <svg 
            :class="isExpanded ? 'rotate-180' : ''"
            class="w-5 h-5 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      
      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-dark-700/50 rounded-lg p-2">
          <div class="text-lg font-bold text-accent-success">{{ stats.correct }}</div>
          <div class="text-xs text-dark-300">Correct</div>
        </div>
        <div class="bg-dark-700/50 rounded-lg p-2">
          <div class="text-lg font-bold text-accent-primary">{{ stats.total }}</div>
          <div class="text-xs text-dark-300">Total</div>
        </div>
        <div class="bg-dark-700/50 rounded-lg p-2">
          <div class="text-lg font-bold text-accent-warning">{{ stats.accuracy }}%</div>
          <div class="text-xs text-dark-300">Score</div>
        </div>
      </div>
    </div>

    <!-- Expandable Content -->
    <div v-if="isExpanded" class="p-4 space-y-3">
      <!-- Recent Attempts -->
      <div>
        <h4 class="text-sm font-medium text-dark-200 mb-2">Recent Attempts</h4>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div 
            v-for="(attempt, index) in recentAttempts" 
            :key="attempt.question"
            class="flex items-center justify-between text-xs bg-dark-700/30 rounded-lg p-2"
          >
            <div class="flex items-center space-x-2">
              <div 
                :class="[
                  'w-5 h-5 rounded flex items-center justify-center text-xs font-bold',
                  attempt.correct ? 'bg-accent-success/20 text-accent-success' : 'bg-accent-error/20 text-accent-error'
                ]"
              >
                {{ attempt.question + 1 }}
              </div>
              <div class="font-mono text-dark-200">
                {{ attempt.pattern.join(' ') }}
              </div>
            </div>
            <div :class="attempt.correct ? 'text-accent-success' : 'text-accent-error'">
              {{ attempt.correct ? '✓' : '✗' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div>
        <div class="flex justify-between text-xs text-dark-300 mb-1">
          <span>Progress</span>
          <span>{{ parameters.currentQuestion + 1 }}/{{ parameters.size }}</span>
        </div>
        <div class="w-full bg-dark-700 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-accent-success to-green-600 h-2 rounded-full transition-all duration-300"
            :style="`width: ${((parameters.currentQuestion + 1) / parameters.size) * 100}%`"
          ></div>
        </div>
      </div>
    </div>

    <!-- Compact View -->
    <div v-else class="p-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-dark-300">{{ stats.correct }}/{{ stats.total }} correct</span>
        <span :class="[
          'font-medium',
          stats.accuracy >= 80 ? 'text-accent-success' : 
          stats.accuracy >= 60 ? 'text-accent-warning' : 'text-accent-error'
        ]">
          {{ stats.accuracy }}%
        </span>
      </div>
    </div>
  </div>
</template>