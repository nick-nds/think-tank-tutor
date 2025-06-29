<script setup>
import { inject, computed, ref, onMounted } from 'vue'

const parameters = inject('parameters')
const attempted = inject('attempted')

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 200)
})

const stats = computed(() => {
  const total = attempted.value.length
  const correct = attempted.value.filter(attempt => attempt.correct).length
  const incorrect = total - correct
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
    icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2c-.075 0-.15.004-.225.012L9 3.205A2 2 0 006.795 1H4.5A2.5 2.5 0 002 3.5V9a2 2 0 002 2h1m0 0h7m-7.013 1H7a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3a2 2 0 012-2z'
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

const columnStats = computed(() => {
  const columnCounts = [0, 0, 0] // Letter, Number, Reverse
  const columnCorrect = [0, 0, 0]
  
  attempted.value.forEach(attempt => {
    const hiddenIndex = attempt.pattern.findIndex((_, index) => 
      attempt.pattern.every((item, i) => 
        i === index || parameters.value.cols[i]
      ) && !parameters.value.cols[index]
    )
    
    if (hiddenIndex !== -1) {
      columnCounts[hiddenIndex]++
      if (attempt.correct) {
        columnCorrect[hiddenIndex]++
      }
    }
  })
  
  const columnNames = ['Letters', 'Numbers', 'Reverse Letters']
  return columnNames.map((name, index) => ({
    name,
    total: columnCounts[index],
    correct: columnCorrect[index],
    accuracy: columnCounts[index] > 0 ? Math.round((columnCorrect[index] / columnCounts[index]) * 100) : 0
  })).filter(stat => stat.total > 0)
})

const restart = () => {
  parameters.value.currentQuestion = -1
  parameters.value.end = false
  attempted.value = []
}

const startNew = () => {
  parameters.value.currentQuestion = -1
  parameters.value.end = false
  attempted.value = []
  // Could add logic to randomize patterns or change settings
}

const getColumnName = (index) => {
  const names = ['Letter', 'Number', 'Reverse']
  return names[index] || 'Unknown'
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border-b border-dark-600/30">
      <div class="max-w-4xl mx-auto px-6 py-16 text-center">
        <div :class="isLoaded ? 'animate-bounce-in' : 'opacity-0'">
          <div class="mb-4">
            <svg :class="[performance.color, 'w-16 h-16 mx-auto']" fill="currentColor" viewBox="0 0 20 20">
              <path :d="performance.icon"></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-dark-50 mb-4">Pattern Session Complete!</h1>
          <p class="text-xl text-dark-200 mb-8">Excellent work on mastering alphabet patterns</p>
        </div>
      </div>
    </div>

    <!-- Main Stats -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Overall Performance -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.2s;" class="text-center mb-16">
        <div :class="[performance.bg, 'rounded-2xl p-8 mb-8 max-w-md mx-auto']">
          <div :class="[performance.color, 'text-3xl font-bold mb-2']">{{ stats.accuracy }}%</div>
          <div :class="[performance.color, 'text-lg font-medium mb-1']">{{ performance.level }}</div>
          <div class="text-dark-300 text-sm">Overall Accuracy</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="surface-elevated p-6 text-center">
            <div class="text-2xl font-bold text-accent-success mb-1">{{ stats.correct }}</div>
            <div class="text-dark-300 text-sm">Correct</div>
          </div>
          <div class="surface-elevated p-6 text-center">
            <div class="text-2xl font-bold text-accent-error mb-1">{{ stats.incorrect }}</div>
            <div class="text-dark-300 text-sm">Incorrect</div>
          </div>
          <div class="surface-elevated p-6 text-center">
            <div class="text-2xl font-bold text-accent-primary mb-1">{{ stats.total }}</div>
            <div class="text-dark-300 text-sm">Total</div>
          </div>
        </div>
      </div>

      <!-- Column Performance -->
      <div v-if="columnStats.length > 0" :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.4s;" class="mb-16">
        <h2 class="text-2xl font-bold text-dark-50 text-center mb-8">Performance by Column Type</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div 
            v-for="columnStat in columnStats" 
            :key="columnStat.name"
            class="surface-elevated p-6 text-center"
          >
            <div class="mb-2">
              <svg v-if="columnStat.name === 'Letters'" class="w-8 h-8 mx-auto text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zM7 7a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7z"></path>
              </svg>
              <svg v-else-if="columnStat.name === 'Numbers'" class="w-8 h-8 mx-auto text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM14 8a1 1 0 10-2 0v4a1 1 0 102 0V8z"></path>
              </svg>
              <svg v-else class="w-8 h-8 mx-auto text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"></path>
              </svg>
            </div>
            <div class="text-lg font-semibold text-dark-100 mb-3">{{ columnStat.name }}</div>
            <div class="text-2xl font-bold mb-1" :class="{
              'text-accent-success': columnStat.accuracy >= 80,
              'text-accent-warning': columnStat.accuracy >= 60 && columnStat.accuracy < 80,
              'text-accent-error': columnStat.accuracy < 60
            }">
              {{ columnStat.accuracy }}%
            </div>
            <div class="text-dark-300 text-sm">{{ columnStat.correct }}/{{ columnStat.total }} correct</div>
          </div>
        </div>
      </div>

      <!-- Question Review -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.6s;" class="mb-16">
        <h2 class="text-2xl font-bold text-dark-50 text-center mb-8">Pattern Review</h2>
        <div class="max-w-4xl mx-auto space-y-4">
          <div 
            v-for="(attempt, index) in attempted" 
            :key="index"
            :class="[
              'surface-elevated p-4 flex items-center justify-between',
              attempt.correct ? 'border-l-4 border-accent-success' : 'border-l-4 border-accent-error'
            ]"
          >
            <div class="flex items-center space-x-4">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" :class="{
                'bg-accent-success/20 text-accent-success': attempt.correct,
                'bg-accent-error/20 text-accent-error': !attempt.correct
              }">
                {{ attempt.question + 1 }}
              </div>
              <div class="font-mono">
                <div class="flex space-x-2">
                  <span 
                    v-for="(item, i) in attempt.pattern" 
                    :key="i"
                    :class="[
                      'px-2 py-1 rounded text-sm',
                      parameters.cols[i] ? 'bg-accent-success/20 text-accent-success' : 'bg-accent-primary/20 text-accent-primary'
                    ]"
                  >
                    {{ parameters.cols[i] ? item : '?' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold" :class="{
                'text-accent-success': attempt.correct,
                'text-accent-error': !attempt.correct
              }">
                {{ attempt.userAnswer || 'Skipped' }}
              </div>
              <div class="text-sm text-dark-400">
                Correct: {{ attempt.correctAnswer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'" style="animation-delay: 0.8s;" class="text-center">
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button @click="restart" class="btn-primary flex-1">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
          <button @click="startNew" class="btn-secondary flex-1">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Session
          </button>
        </div>
        
        <NuxtLink to="/" class="btn-ghost mt-4 inline-flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>