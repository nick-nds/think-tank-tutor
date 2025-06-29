<script setup>
import { ref, provide, watchEffect, inject } from 'vue'
import { useRandomizeArray } from '../composables/useRandomizeArray'
import { useOperate } from '../composables/useOperate'
import { useGenerateList } from '../composables/useGenerateList'
import { useGenerateRootList } from '../composables/useGenerateRootList'

const title = inject('preTitle')
title.value = 'Operations'

/**
 * Load settings from localStorage
 */
const loadOperationsSettings = () => {
  if (process.client) {
    try {
      const saved = localStorage.getItem('operations-settings')
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          range: parsed.range || { a: [1, 10], b: [1, 10] },
          size: parseInt(parsed.size) || 10,
          regenerate: false, // Always reset regenerate flag
          selectedOperations: parsed.selectedOperations || []
        }
      }
    } catch (error) {
      console.warn('Failed to load operations settings:', error)
    }
  }
  return {
    range: { a: [1, 10], b: [1, 10] },
    size: 10,
    regenerate: false,
    selectedOperations: []
  }
}

/**
 * Save settings to localStorage
 */
const saveOperationsSettings = (params, operations) => {
  if (process.client) {
    try {
      const toSave = {
        range: params.range,
        size: params.size,
        selectedOperations: operations,
        // Don't save regenerate flag
      }
      localStorage.setItem('operations-settings', JSON.stringify(toSave))
    } catch (error) {
      console.warn('Failed to save operations settings:', error)
    }
  }
}

/**
 * Load initial settings
 */
const initialSettings = loadOperationsSettings()

/**
 * Operation parameters for number generation and game settings
 */
const parameters = ref({
  range: initialSettings.range,
  size: initialSettings.size,
  regenerate: initialSettings.regenerate
})

/**
 * Generated number lists for operands
 */
const lists = ref({
  a: [],
  b: [],
})

/**
 * Game state and action flags
 */
const actions = ref({
  start: false,
  generate: false,
  restart: false,
  currentQuestion: -1,
  complete: false,
  direction: true,
})

/**
 * Currently selected mathematical operations
 */
const selectedOperations = ref(initialSettings.selectedOperations)

/**
 * Generated mathematical expressions with answers
 */
const expressions = ref([])

/**
 * Sidebar visibility for mobile
 */
const showSidebar = ref(false)

/**
 * Generate expressions when game is active and incomplete
 */
watchEffect(() => {
  if (!actions.value.complete && lists.value.a.length > 0 && lists.value.b.length > 0) {
    // Keep only expressions with status (answered questions)
    expressions.value = expressions.value.filter(expression => 
      expression.status !== null
    )
    
    const currentCount = expressions.value.length
    const targetSize = parameters.value.size
    
    // Generate remaining expressions only if we have enough data
    for (let i = currentCount; i < targetSize; i++) {
      const a = lists.value.a[i]
      const b = lists.value.b[i]
      
      // Skip if data is not available
      if (a === undefined || b === undefined) {
        break
      }
      
      const operator = selectedOperations.value.length > 0 
        ? useRandomizeArray(selectedOperations.value)[0] 
        : 'add'
      
      expressions.value.push({
        a,
        b,
        operator,
        value: useOperate(a, b, operator),
        status: null,
        answer: null,
      })
    }
  }
})

/**
 * Generate number lists when parameters change
 */
watchEffect(() => {
  // Trigger on regenerate flag changes
  parameters.value.regenerate
  
  // Generate operand B list
  lists.value.b = useGenerateList(
    parameters.value.range.b[0], 
    parameters.value.range.b[1], 
    parameters.value.size
  )
  
  // Generate operand A list (special handling for root operations)
  const isOnlyRootOperation = selectedOperations.value.length === 1 
    && selectedOperations.value[0] === 'root'
    
  if (isOnlyRootOperation) {
    lists.value.a = useGenerateRootList(
      parameters.value.range.a[0], 
      parameters.value.range.a[1], 
      lists.value.b, 
      parameters.value.size
    )
  } else {
    lists.value.a = useGenerateList(
      parameters.value.range.a[0], 
      parameters.value.range.a[1], 
      parameters.value.size
    )
  }
})

/**
 * Save settings when parameters change
 */
watch([parameters, selectedOperations], () => {
  saveOperationsSettings(parameters.value, selectedOperations.value)
}, { deep: true, flush: 'post' })

/**
 * Handle game restart logic
 */
watchEffect(() => {
  if (actions.value.restart) {
    // Toggle regenerate flag to trigger new number generation
    parameters.value.regenerate = !parameters.value.regenerate
    
    // Reset game state
    actions.value.currentQuestion = 0
    actions.value.restart = false
    actions.value.complete = false
    expressions.value = []
  }
})

provide('parameters', parameters)
provide('lists', lists)
provide('selectedOperations', selectedOperations)
provide('expressions', expressions)
provide('actions', actions)

// Remove unused refs - these were declared but never used
// const cardRef = ref(null)
// const modalRef = ref(null)

</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-16">
    <!-- Header Section with Progress -->
    <div class="border-b border-dark-600/30 bg-dark-800/50 backdrop-blur-sm sticky top-16 z-40">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Page Title -->
          <div class="flex items-center space-x-4">
          </div>


          <!-- Settings Toggle (Mobile) -->
          <button 
            @click="showSidebar = !showSidebar"
            class="lg:hidden icon-btn-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex relative">
      <!-- Enhanced Sidebar -->
      <div 
        :class="[
          'transition-all duration-300 bg-dark-800/30 backdrop-blur-sm border-r border-dark-600/50',
          'lg:w-80 lg:translate-x-0',
          showSidebar ? 'fixed inset-y-0 left-0 top-16 w-80 z-50 translate-x-0' : 'fixed -translate-x-full lg:relative lg:translate-x-0'
        ]"
      >
        <!-- Sidebar Overlay for Mobile -->
        <div 
          v-if="showSidebar" 
          @click="showSidebar = false"
          class="lg:hidden fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-40"
        ></div>
        
        <div class="relative z-50 h-full">
          <OperationsModernSidebar @close="showSidebar = false" />
        </div>
      </div>

      <!-- Main Practice Area -->
      <div class="flex-1 min-h-[calc(100vh-8rem)] relative">
        <!-- Welcome State -->
        <div v-if="actions.currentQuestion === -1 && !actions.complete" class="h-full">
          <OperationsWelcomeScreen />
        </div>

        <!-- Practice Session -->
        <div v-else-if="actions.currentQuestion > -1 && !actions.complete" class="h-full">
          <OperationsActiveSession />
        </div>

        <!-- Results Screen -->
        <div v-else-if="actions.complete" class="h-full">
          <OperationsResultsScreen />
        </div>
      </div>
    </div>
  </div>
</template>
