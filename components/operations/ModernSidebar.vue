<script setup>
import { inject, ref, computed } from 'vue'

defineEmits(['close'])

const parameters = inject('parameters')
const selectedOperations = inject('selectedOperations')
const actions = inject('actions')
const expressions = inject('expressions')

const operations = ref({
  add: {
    name: 'Addition',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    symbol: '+',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    selected: false,
  },
  subtract: {
    name: 'Subtraction',
    icon: 'M18 12H6',
    symbol: '−',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30',
    selected: false,
  },
  multiply: {
    name: 'Multiplication',
    icon: 'M6 18L18 6M6 6l12 12',
    symbol: '×',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    selected: false,
  },
  divide: {
    name: 'Division',
    icon: 'M8 12h8M12 8v8',
    symbol: '÷',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    selected: false,
  },
  exponent: {
    name: 'Exponents',
    icon: 'M6 14l4-8 4 8M10 10h4',
    symbol: '^',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30',
    selected: false,
  },
  root: {
    name: 'Roots',
    icon: 'M4 16l2-4 4 8 6-12h6',
    symbol: '√',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    selected: false,
  },
})

const selectedCount = computed(() => selectedOperations.value.length)

const toggleOperation = (key) => {
  operations.value[key].selected = !operations.value[key].selected
  
  if (operations.value[key].selected) {
    if (!selectedOperations.value.includes(key)) {
      selectedOperations.value.push(key)
    }
  } else {
    const index = selectedOperations.value.indexOf(key)
    if (index !== -1) {
      selectedOperations.value.splice(index, 1)
    }
  }
}

const updateRange = (type, index, value) => {
  const numValue = parseInt(value)
  if (!isNaN(numValue)) {
    parameters.value.range[type][index] = numValue
    // Trigger regeneration
    parameters.value.regenerate = !parameters.value.regenerate
  }
}

const updateSize = (value) => {
  const numValue = parseInt(value)
  if (!isNaN(numValue) && numValue > 0 && numValue <= 100) {
    parameters.value.size = numValue
  }
}

const restart = () => {
  expressions.value = expressions.value.map(expression => {
    expression.status = null
    expression.answer = null
    return expression
  })
  actions.value.restart = true
}

// Sync selected operations with the operations object
selectedOperations.value.forEach(op => {
  if (operations.value[op]) {
    operations.value[op].selected = true
  }
})
</script>

<template>
  <div class="h-full flex flex-col bg-dark-800/50 backdrop-blur-sm">
    <!-- Header -->
    <div class="p-3 sm:p-4 border-b border-dark-600/30">
      <div class="flex items-center justify-between mb-1">
        <h2 class="text-base sm:text-lg font-bold text-dark-50">Settings</h2>
        <button @click="$emit('close')" class="lg:hidden p-1 rounded hover:bg-dark-700 text-dark-400 hover:text-dark-200 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Operations Selection -->
      <div class="p-3 sm:p-4 border-b border-dark-600/30">
        <div class="flex items-center justify-between mb-2 sm:mb-3">
          <h3 class="text-sm sm:text-base font-semibold text-dark-100">Operations</h3>
          <div class="bg-accent-primary/20 text-accent-primary px-2 py-1 rounded text-xs">{{ selectedCount }}</div>
        </div>
        
        <div class="grid grid-cols-3 gap-1 sm:gap-2">
          <div 
            v-for="(operation, key) in operations" 
            :key="key"
            @click="toggleOperation(key)"
            :class="[
              'cursor-pointer rounded p-2 sm:p-3 border transition-all duration-300 group text-center touch-manipulation',
              operation.selected 
                ? `${operation.bgColor} ${operation.borderColor}` 
                : 'bg-dark-700/30 border-dark-600 hover:border-dark-500'
            ]"
          >
            <div :class="[operation.selected ? operation.color : 'text-dark-400', 'flex items-center justify-center h-6 sm:h-8 mb-1']">
              <svg v-if="operation.icon" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="operation.icon"></path>
              </svg>
              <span v-else class="text-base sm:text-lg font-bold">{{ operation.symbol }}</span>
            </div>
            <div :class="[operation.selected ? 'text-dark-50' : 'text-dark-200', 'font-medium text-xs leading-tight']">
              {{ operation.name.split(' ')[0] }}
            </div>
            <div v-if="operation.selected" :class="[operation.color, 'mt-1']">
              <svg class="w-2 h-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Range Settings -->
      <div class="p-3 sm:p-4 border-b border-dark-600/30">
        <h3 class="text-sm font-semibold text-dark-100 mb-2">Ranges</h3>
        
        <!-- Range A -->
        <div class="mb-3">
          <label class="block text-dark-200 text-xs mb-1">A:</label>
          <div class="flex space-x-2">
            <input
              :value="parameters.range.a[0]"
              @input="updateRange('a', 0, $event.target.value)"
              type="number"
              class="bg-dark-800/50 border border-dark-600 text-dark-50 placeholder-dark-400 px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none transition-all w-full text-center text-sm"
            >
            <span class="text-dark-400 text-sm self-center">-</span>
            <input
              :value="parameters.range.a[1]"
              @input="updateRange('a', 1, $event.target.value)"
              type="number"
              class="bg-dark-800/50 border border-dark-600 text-dark-50 placeholder-dark-400 px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none transition-all w-full text-center text-sm"
            >
          </div>
        </div>

        <!-- Range B -->
        <div>
          <label class="block text-dark-200 text-xs mb-1">B:</label>
          <div class="flex space-x-2">
            <input
              :value="parameters.range.b[0]"
              @input="updateRange('b', 0, $event.target.value)"
              type="number"
              class="bg-dark-800/50 border border-dark-600 text-dark-50 placeholder-dark-400 px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none transition-all w-full text-center text-sm"
            >
            <span class="text-dark-400 text-sm self-center">-</span>
            <input
              :value="parameters.range.b[1]"
              @input="updateRange('b', 1, $event.target.value)"
              type="number"
              class="bg-dark-800/50 border border-dark-600 text-dark-50 placeholder-dark-400 px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none transition-all w-full text-center text-sm"
            >
          </div>
        </div>
      </div>

      <!-- Session Settings -->
      <div class="p-3 sm:p-4 border-b border-dark-600/30">
        <h3 class="text-sm font-semibold text-dark-100 mb-2">Questions</h3>
        
        <div>
          <input
            :value="parameters.size"
            @input="updateSize($event.target.value)"
            type="number"
            min="1"
            class="bg-dark-800/50 border border-dark-600 text-dark-50 placeholder-dark-400 px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none transition-all w-full text-center text-sm"
            placeholder="Number of questions"
          >
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-3 sm:p-4 border-t border-dark-600/30 bg-dark-800/30">
      <button 
        v-if="actions.currentQuestion > -1"
        @click="restart"
        class="bg-gradient-to-r from-accent-error to-red-600 hover:from-red-600 hover:to-accent-error text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium w-full text-sm"
      >
        Reset Practice
      </button>
    </div>
  </div>
</template>