<script setup>
import { ref, inject, provide, computed, watchEffect } from 'vue'
import { ALPHABET_MAPPINGS } from '../composables/useGenerateAlphabets'
import { useGenerateAlphabets } from '../composables/useGenerateAlphabets'
import { useRandomIntFromInterval } from '../composables/useRandomIntFromInterval'

const title = inject('preTitle')
title.value = 'Alphabet Patterns'


/**
 * Gets the default value for matrix display
 * @returns {Array<string|number>} Default row values
 */
const getDefaultValue = () => {
  const row = ALPHABET_MAPPINGS[1]
  return [row[0], 1, row[2]]
}

/**
 * Gets the default column visibility settings
 * @returns {Array<boolean>} Column visibility array
 */
const getCols = () => {
  return [true, false, false]
}

/**
 * Load settings from localStorage
 */
const loadAlphabetSettings = () => {
  if (process.client) {
    try {
      const saved = localStorage.getItem('alphabet-patterns-settings')
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          cols: parsed.cols || getCols(),
          random: parsed.random || false,
          size: parseInt(parsed.size) || 10,
          currentQuestion: -1, // Always reset question state
          defaultValue: getDefaultValue(),
          paused: false, // Always reset session state
          end: false, // Always reset session state
        }
      }
    } catch (error) {
      console.warn('Failed to load alphabet patterns settings:', error)
    }
  }
  return {
    cols: getCols(),
    random: false,
    size: 10,
    currentQuestion: -1,
    defaultValue: getDefaultValue(),
    paused: false,
    end: false,
  }
}

/**
 * Save settings to localStorage
 */
const saveAlphabetSettings = (params) => {
  if (process.client) {
    try {
      const toSave = {
        cols: params.cols,
        random: params.random,
        size: params.size,
        // Don't save session state
      }
      localStorage.setItem('alphabet-patterns-settings', JSON.stringify(toSave))
    } catch (error) {
      console.warn('Failed to save alphabet patterns settings:', error)
    }
  }
}

const parameters = ref(loadAlphabetSettings())

/**
 * Gets indices of currently active/visible columns
 * @returns {Array<number>} Array of active column indices
 */
const getActiveCols = () => {
  return parameters.value.cols.reduce((activeCols, isActive, index) => {
    if (isActive) activeCols.push(index)
    return activeCols
  }, [])
}

/**
 * Computed matrix of alphabet triplets based on current size
 */
const matrix = computed(() => {
  // Trigger reactivity on relevant parameter changes
  parameters.value.size
  parameters.value.currentQuestion
  parameters.value.end
  return useGenerateAlphabets(parameters.value.size)
})

/**
 * Transforms a row based on column visibility and randomization settings
 * @param {Array} row - The row data to transform
 * @returns {Array} Transformed row with visible/hidden columns
 */
const transformRow = (row) => {
  const activeCols = getActiveCols()
  
  if (parameters.value.random) {
    const randomCols = activeCols.map(() => 
      useRandomIntFromInterval(0, parameters.value.cols.length - 1)
    )
    return row.map((item, index) => 
      randomCols.includes(index) ? item : null
    )
  }
  
  return row.map((item, index) => 
    activeCols.includes(index) ? item : null
  )
}

/**
 * Computed expressions with transformed rows for display
 */
const expressions = computed(() => {
  return matrix.value.map(row => transformRow(row))
})

const attempted = ref([])

/**
 * Controls panel visibility for mobile
 */
const showControls = ref(false)

/**
 * Save settings when parameters change
 */
watch(parameters, () => {
  saveAlphabetSettings(parameters.value)
}, { deep: true, flush: 'post' })

watchEffect(() => {
  if(parameters.value.currentQuestion == -1) {
    attempted.value = []
  }
})

provide('expressions', expressions)
provide('matrix', matrix)
provide('parameters', parameters)
provide('attempted', attempted)

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-16">
    <!-- Header Section -->
    <div class="border-b border-dark-600/30 bg-dark-800/50 backdrop-blur-sm sticky top-16 z-40">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <!-- Page Title -->
          <div class="flex items-center space-x-4">
            <h1 class="text-lg sm:text-xl font-semibold text-dark-50">Alphabet Patterns</h1>
          </div>

          <!-- Settings Toggle (Mobile) -->
          <button 
            @click="showControls = !showControls"
            class="lg:hidden flex items-center gap-2 bg-dark-700/50 hover:bg-dark-700 border border-dark-600 hover:border-dark-500 px-3 py-2 rounded-lg transition-all duration-200"
          >
            <svg class="w-5 h-5 text-dark-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
            <span class="text-sm text-dark-200">Settings</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex relative">
      <!-- Enhanced Controls Panel -->
      <div 
        :class="[
          'transition-all duration-300 bg-dark-800/30 backdrop-blur-sm border-r border-dark-600/50',
          'lg:w-80 lg:translate-x-0',
          showControls ? 'fixed inset-y-0 left-0 top-16 w-full max-w-sm z-50 translate-x-0' : 'fixed -translate-x-full lg:relative lg:translate-x-0'
        ]"
      >
        <!-- Controls Overlay for Mobile -->
        <div 
          v-if="showControls" 
          @click="showControls = false"
          class="lg:hidden fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-40"
        ></div>
        
        <div class="relative z-50 h-full">
          <AlphabetPatternsModernControls @close="showControls = false" />
        </div>
      </div>

      <!-- Main Learning Area -->
      <div class="flex-1 min-h-[calc(100vh-8rem)] relative">
        <!-- Welcome State -->
        <div v-if="parameters.currentQuestion === -1" class="h-full">
          <AlphabetPatternsWelcome />
        </div>

        <!-- Active Learning Session -->
        <div v-else-if="parameters.currentQuestion > -1 && !parameters.end" class="h-full">
          <AlphabetPatternsActiveSession />
          
          <!-- Floating Settings Button (Mobile) -->
          <button 
            @click="showControls = !showControls"
            class="lg:hidden fixed bottom-6 right-6 z-40 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <svg class="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="absolute -top-8 right-0 bg-dark-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Settings
            </span>
          </button>
        </div>

        <!-- Results/Complete State -->
        <div v-else-if="parameters.end" class="h-full">
          <AlphabetPatternsResults />
        </div>
      </div>
    </div>

    <!-- Attempted Answers Overlay -->
    <div v-if="attempted.length > 0 && parameters.currentQuestion > -1" class="fixed bottom-6 right-6 z-50">
      <AlphabetPatternsAttemptedSummary />
    </div>
  </div>
</template>

