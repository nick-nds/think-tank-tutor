<script setup>
import { inject, computed, ref, onMounted } from 'vue'

const parameters = inject('parameters')

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 200)
})

const canStart = computed(() => {
  return parameters.value.size > 0 && parameters.value.cols.some(col => col)
})

const startPractice = () => {
  if (canStart.value) {
    parameters.value.currentQuestion = 0
  }
}

const visibleColumns = computed(() => {
  const columnNames = ['Letter (A)', 'Number (1)', 'Reverse (Z)']
  return parameters.value.cols
    .map((visible, index) => visible ? columnNames[index] : null)
    .filter(Boolean)
})

const patternExamples = [
  { letter: 'A', number: 1, reverse: 'Z', description: 'First letter maps to 1 and Z' },
  { letter: 'B', number: 2, reverse: 'Y', description: 'Second letter maps to 2 and Y' },
  { letter: 'M', number: 13, reverse: 'N', description: 'Middle letter maps to 13 and N' }
]
</script>

<template>
  <div class="h-full flex justify-center p-6">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Hero Section -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'">
        <div class="w-16 h-16 bg-gradient-to-br from-accent-success to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-success/25">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        
        <h2 class="text-3xl font-bold text-dark-50 mb-4">Ready to Practice?</h2>
        <p class="text-base text-dark-200 mb-4 max-w-2xl mx-auto">
          Master rapid-fire alphabet patterns. Letters map to numbers and reverse letters (A=1=Z, B=2=Y).
        </p>
        
        <!-- Mobile Settings Hint -->
        <div class="lg:hidden bg-accent-success/10 border border-accent-success/30 rounded-lg p-3 mb-4 max-w-md mx-auto animate-pulse-gentle">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-accent-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-sm text-dark-100">
              Tap <span class="font-semibold">Settings</span> button at the top to configure columns and patterns
            </p>
          </div>
        </div>
      </div>

      <!-- Current Settings Display -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.2s;" class="surface-elevated p-4 mb-4 max-w-md mx-auto">
        <h3 class="text-base font-semibold text-dark-100 mb-3">Current Settings</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-dark-300">Patterns:</span>
            <span class="text-dark-100 font-medium">{{ parameters.size }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-300">Visible Columns:</span>
            <span class="text-dark-100 font-medium">{{ visibleColumns.length }}</span>
          </div>
          <div v-if="visibleColumns.length > 0" class="pt-2 border-t border-dark-600">
            <div class="text-dark-300 mb-1">Showing:</div>
            <div class="text-dark-100 font-medium text-xs">
              {{ visibleColumns.join(', ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <div :class="isLoaded ? 'animate-bounce-in' : 'opacity-0'" style="animation-delay: 0.4s;">
        <button 
          @click="startPractice"
          :disabled="!canStart"
          :class="[
            'btn-primary text-base px-6 py-3 shadow-lg transform transition-all duration-300',
            canStart 
              ? 'hover:scale-105 hover:shadow-accent-success/30' 
              : 'opacity-50 cursor-not-allowed hover:scale-100'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>Start Rapid Practice</span>
          </span>
        </button>
        
        <p v-if="!canStart" class="text-dark-400 text-sm mt-3">
          Please configure at least one visible column to begin
        </p>
      </div>

      <!-- Quick Tips -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'" style="animation-delay: 0.6s;" class="mt-4 max-w-2xl mx-auto">
        <div class="grid md:grid-cols-2 gap-3 text-sm">
          <div class="bg-dark-700/30 rounded-lg p-3 text-left">
            <div class="text-accent-success font-medium text-xs flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
              </svg>
              Speed Mode
            </div>
            <div class="text-dark-300 text-xs">Keyboard-only, rapid-fire practice</div>
          </div>
          <div class="bg-dark-700/30 rounded-lg p-3 text-left">
            <div class="text-accent-primary font-medium text-xs flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
              </svg>
              Auto-Focus
            </div>
            <div class="text-dark-300 text-xs">Answer field auto-focused, press Enter</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>