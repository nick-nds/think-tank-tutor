<script setup>
import { inject, ref, computed } from 'vue'

defineEmits(['close'])

const parameters = inject('parameters')
const attempted = inject('attempted')

const columnOptions = [
  { key: 0, name: 'Letter (A)', description: 'Show the alphabet letter' },
  { key: 1, name: 'Number (1)', description: 'Show the sequential number' },
  { key: 2, name: 'Reverse (Z)', description: 'Show the reverse alphabet letter' }
]

const toggleColumn = (index) => {
  parameters.value.cols[index] = !parameters.value.cols[index]
  
  // Ensure at least one column is visible
  const hasVisible = parameters.value.cols.some(col => col)
  if (!hasVisible) {
    parameters.value.cols[index] = true
  }
}

const updateSize = (value) => {
  const numValue = parseInt(value)
  if (!isNaN(numValue) && numValue > 0) {
    parameters.value.size = numValue
  }
}

const resetSession = () => {
  parameters.value.currentQuestion = -1
  parameters.value.end = false
  attempted.value = []
}

const visibleCount = computed(() => parameters.value.cols.filter(col => col).length)
</script>

<template>
  <div class="h-full flex flex-col bg-dark-800/50 backdrop-blur-sm">
    <!-- Header -->
    <div class="p-4 border-b border-dark-600/30">
      <div class="flex items-center justify-between mb-1">
        <h2 class="text-lg font-bold text-dark-50">Settings</h2>
        <button @click="$emit('close')" class="lg:hidden icon-btn text-dark-400 hover:text-dark-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Column Visibility -->
      <div class="p-4 border-b border-dark-600/30">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-dark-100">Columns</h3>
          <div class="badge-primary text-xs">{{ visibleCount }}</div>
        </div>
        
        <div class="space-y-2">
          <div 
            v-for="(option, index) in columnOptions" 
            :key="index"
            @click="toggleColumn(index)"
            :class="[
              'cursor-pointer rounded-lg p-2 border-2 transition-all duration-300 group',
              parameters.cols[index] 
                ? 'bg-accent-primary/10 border-accent-primary/30' 
                : 'bg-dark-700/30 border-dark-600 hover:border-dark-500'
            ]"
          >
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
                parameters.cols[index] ? 'bg-accent-primary/20' : 'bg-dark-600 group-hover:bg-dark-500'
              ]">
                <svg :class="[parameters.cols[index] ? 'text-accent-primary' : 'text-dark-300', 'w-4 h-4']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="flex-1">
                <div :class="[parameters.cols[index] ? 'text-dark-50' : 'text-dark-200', 'font-medium text-sm']">
                  {{ option.name }}
                </div>
              </div>
              <div v-if="parameters.cols[index]" class="text-accent-primary">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pattern Settings -->
      <div class="p-3 border-b border-dark-600/30">
        <h3 class="text-sm font-semibold text-dark-100 mb-2">Questions</h3>
        
        <div>
          <input
            :value="parameters.size"
            @input="updateSize($event.target.value)"
            type="number"
            min="1"
            class="input-field w-full text-center text-xs"
          >
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-2 border-t border-dark-600/30 bg-dark-800/30">
      <button 
        v-if="parameters.currentQuestion > -1"
        @click="resetSession"
        class="btn-error w-full text-xs py-1"
      >
        Reset
      </button>
    </div>
  </div>
</template>