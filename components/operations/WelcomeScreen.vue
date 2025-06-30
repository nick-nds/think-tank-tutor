<script setup>
import { inject, computed, ref, onMounted } from 'vue'

const actions = inject('actions')
const selectedOperations = inject('selectedOperations')
const parameters = inject('parameters')

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 200)
})

const canStart = computed(() => {
  return selectedOperations.value.length > 0 && parameters.value.size > 0
})

const startPractice = () => {
  if (canStart.value) {
    actions.value.currentQuestion = 0
  }
}

const operationStats = [
  { type: 'add', name: 'Addition', icon: '+', color: 'text-blue-400' },
  { type: 'subtract', name: 'Subtraction', icon: '−', color: 'text-green-400' },
  { type: 'multiply', name: 'Multiplication', icon: '×', color: 'text-purple-400' },
  { type: 'divide', name: 'Division', icon: '÷', color: 'text-orange-400' },
  { type: 'exponent', name: 'Exponents', icon: '^', color: 'text-red-400' },
  { type: 'root', name: 'Roots', icon: '√', color: 'text-cyan-400' }
]
</script>

<template>
  <div class="h-full flex justify-center p-6">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Hero Section -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'">
        <div class="w-16 h-16 bg-gradient-to-br from-accent-primary to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-primary/25">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <h2 class="text-3xl font-bold text-dark-50 mb-4">Ready to Practice?</h2>
        <p class="text-base text-dark-200 mb-4 max-w-2xl mx-auto">
          Configure your settings and start rapid-fire practice to boost your calculation speed.
        </p>
        
        <!-- Mobile Settings Hint -->
        <div class="lg:hidden bg-accent-primary/10 border border-accent-primary/30 rounded-lg p-3 mb-4 max-w-md mx-auto animate-pulse-gentle">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-accent-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-sm text-dark-100">
              Tap <span class="font-semibold">Settings</span> button at the top to configure operations and ranges
            </p>
          </div>
        </div>
      </div>

      <!-- Operation Types Grid -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.2s;" class="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
        <div 
          v-for="op in operationStats" 
          :key="op.type"
          :class="[
            'card-hover p-3 text-center transition-all duration-300',
            selectedOperations.includes(op.type) ? 'ring-2 ring-accent-primary ring-opacity-50 bg-accent-primary/5' : ''
          ]"
        >
          <div :class="[op.color, 'text-2xl font-bold mb-1']">{{ op.icon }}</div>
          <div class="text-dark-100 font-medium text-xs">{{ op.name }}</div>
          <div 
            v-if="selectedOperations.includes(op.type)" 
            class="mt-1 w-1 h-1 bg-accent-success rounded-full mx-auto"
          ></div>
        </div>
      </div>

      <!-- Current Settings Display -->
      <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.4s;" class="surface-elevated p-4 mb-4 max-w-md mx-auto">
        <h3 class="text-base font-semibold text-dark-100 mb-3">Current Settings</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-dark-300">Questions:</span>
            <span class="text-dark-100 font-medium">{{ parameters.size }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-300">Range A:</span>
            <span class="text-dark-100 font-medium">{{ parameters.range.a[0] }} - {{ parameters.range.a[1] }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-300">Range B:</span>
            <span class="text-dark-100 font-medium">{{ parameters.range.b[0] }} - {{ parameters.range.b[1] }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-300">Operations:</span>
            <span class="text-dark-100 font-medium">
              {{ selectedOperations.length || 'None selected' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <div :class="isLoaded ? 'animate-bounce-in' : 'opacity-0'" style="animation-delay: 0.6s;">
        <button 
          @click="startPractice"
          :disabled="!canStart"
          :class="[
            'btn-primary text-base px-6 py-3 shadow-lg transform transition-all duration-300',
            canStart 
              ? 'hover:scale-105 hover:shadow-accent-primary/30' 
              : 'opacity-50 cursor-not-allowed hover:scale-100'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10h.01M5 18h.01M12 5.99h.01M18 5.99h.01M12 18.01h.01"></path>
            </svg>
            <span>Start Rapid Practice</span>
          </span>
        </button>
        
        <p v-if="!canStart" class="text-dark-400 text-sm mt-3">
          Please select at least one operation type to begin
        </p>
      </div>

      <!-- Quick Tips -->
      <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'" style="animation-delay: 0.8s;" class="mt-4 max-w-2xl mx-auto">
        <div class="grid md:grid-cols-2 gap-3 text-sm">
          <div class="bg-dark-700/30 rounded-lg p-3 text-left">
            <div class="text-accent-primary font-medium text-xs">⚡ Speed Mode</div>
            <div class="text-dark-300 text-xs">Keyboard-only, rapid-fire practice</div>
          </div>
          <div class="bg-dark-700/30 rounded-lg p-3 text-left">
            <div class="text-accent-success font-medium text-xs">🎯 Auto-Focus</div>
            <div class="text-dark-300 text-xs">Answer field auto-focused, press Enter</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>