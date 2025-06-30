<script setup>
import { inject, computed, ref, watch, onMounted, nextTick } from 'vue'
import { ALPHABET_MAPPINGS } from '../../composables/useGenerateAlphabets'

const parameters = inject('parameters')
const expressions = inject('expressions')
const matrix = inject('matrix')
const attempted = inject('attempted')

const userInput = ref('')
const showFeedback = ref(false)
const isCorrect = ref(false)
const answerInput = ref(null)
const userAnswers = ref([])
const currentBlankIndex = ref(0)

const currentPattern = computed(() => {
  if (parameters.value.currentQuestion < 0 || !matrix.value[parameters.value.currentQuestion]) {
    return null
  }
  return matrix.value[parameters.value.currentQuestion]
})

const displayedPattern = computed(() => {
  if (!currentPattern.value) return []
  
  // Create the display pattern based on user column selections
  const result = [...currentPattern.value]
  const visibleCols = [...parameters.value.cols] // Don't modify original
  
  // Create blanks for non-visible columns
  visibleCols.forEach((visible, index) => {
    if (!visible) {
      result[index] = null
    }
  })
  
  // Fill in user answers progressively
  userAnswers.value.forEach((answer, answerIndex) => {
    const blankIndices = getBlankIndices()
    if (blankIndices[answerIndex] !== undefined) {
      result[blankIndices[answerIndex]] = answer
    }
  })
  
  return result
})

const getBlankIndices = () => {
  if (!currentPattern.value) return []
  return parameters.value.cols
    .map((visible, index) => !visible ? index : null)
    .filter(index => index !== null)
}

const currentBlankColumn = computed(() => {
  const blankIndices = getBlankIndices()
  const index = currentBlankIndex.value
  const result = blankIndices[index]
  return result !== undefined ? result : null
})

const isQuestionComplete = computed(() => {
  const blankIndices = getBlankIndices()
  return blankIndices.length > 0 && userAnswers.value.length >= blankIndices.length
})

const progress = computed(() => {
  return ((parameters.value.currentQuestion + 1) / parameters.value.size) * 100
})

const score = computed(() => {
  const total = attempted.value.length
  const correct = attempted.value.filter(attempt => attempt.correct).length
  return total > 0 ? Math.round((correct / total) * 100) : 0
})

const getColumnName = (index) => {
  const names = ['Letter', 'Number', 'Reverse Letter']
  return names[index] || 'Unknown'
}

const submitAnswer = () => {
  const inputValue = userInput.value?.toString() || ''
  if (!currentPattern.value || inputValue.trim() === '' || currentBlankColumn.value === null) return
  
  const answer = inputValue.trim().toUpperCase()
  const correctAnswer = currentPattern.value[currentBlankColumn.value]
  let correct = false
  
  // Safety check for correctAnswer
  if (correctAnswer === null || correctAnswer === undefined) {
    console.warn('correctAnswer is null/undefined', { currentPattern: currentPattern.value, currentBlankColumn: currentBlankColumn.value })
    return
  }
  
  // Check answer (all stored as strings in the mappings)
  correct = answer === correctAnswer.toString()
  
  // Store the answer
  userAnswers.value.push(answer)
  userInput.value = ''
  
  if (isQuestionComplete.value) {
    // Question is complete, show feedback and move to next
    const allCorrect = userAnswers.value.every((userAnswer, index) => {
      const blankIndices = getBlankIndices()
      const columnIndex = blankIndices[index]
      const correctAnswer = currentPattern.value[columnIndex]
      
      // All answers stored as strings in mappings
      return userAnswer === correctAnswer.toString()
    })
    
    isCorrect.value = allCorrect
    showFeedback.value = true
    
    // Record attempt
    attempted.value.push({
      question: parameters.value.currentQuestion,
      pattern: [...currentPattern.value],
      userAnswers: [...userAnswers.value],
      correct: allCorrect
    })
    
    // Auto-advance after feedback
    setTimeout(() => {
      nextQuestion()
    }, 800)
  } else {
    // Move to next blank
    currentBlankIndex.value++
    
    // Auto-focus next input
    nextTick(() => {
      if (answerInput.value) {
        answerInput.value.focus()
      }
    })
  }
}

const nextQuestion = () => {
  showFeedback.value = false
  userInput.value = ''
  userAnswers.value = []
  currentBlankIndex.value = 0
  
  if (parameters.value.currentQuestion < parameters.value.size - 1) {
    parameters.value.currentQuestion++
  } else {
    parameters.value.end = true
  }
  
  // Auto-focus answer input for rapid-fire practice
  nextTick(() => {
    if (answerInput.value) {
      answerInput.value.focus()
    }
  })
}

const skipQuestion = () => {
  // Record as incorrect attempt
  if (currentPattern.value) {
    attempted.value.push({
      question: parameters.value.currentQuestion,
      pattern: [...currentPattern.value],
      userAnswers: [],
      correct: false
    })
  }
  nextQuestion()
}

const getInputPlaceholder = () => {
  if (currentBlankColumn.value === 1) return 'Enter number'
  return 'Enter letter'
}

const getInputType = () => {
  return 'text' // Always use text to avoid type conversion issues
}

const getCurrentBlankName = () => {
  if (currentBlankColumn.value === null) return ''
  return getColumnName(currentBlankColumn.value)
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
  // Initialize state
  userAnswers.value = []
  currentBlankIndex.value = 0
  showFeedback.value = false
  userInput.value = ''
  
  nextTick(() => {
    if (answerInput.value) {
      answerInput.value.focus()
    }
  })
})

watch(() => parameters.value.currentQuestion, () => {
  userAnswers.value = []
  currentBlankIndex.value = 0
  showFeedback.value = false
  userInput.value = ''
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
            <div class="text-sm font-bold text-accent-success mb-1">
              {{ parameters.currentQuestion + 1 }}/{{ parameters.size }} ({{ Math.round(progress) }}%)
            </div>
            <div class="w-24 bg-dark-700 rounded-full h-1 mx-auto overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-accent-success to-green-600 transition-all duration-500 ease-out"
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
            v-for="(attempt, index) in attempted" 
            :key="index"
            :class="[
              'w-5 h-5 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 flex-shrink-0',
              index === parameters.currentQuestion 
                ? 'bg-accent-success text-white ring-2 ring-accent-success/50' 
                : attempt.correct
                ? 'bg-accent-success/20 text-accent-success'
                : 'bg-accent-error/20 text-accent-error'
            ]"
          >
            {{ index + 1 }}
          </div>
          <!-- Show current question indicator -->
          <div 
            v-if="parameters.currentQuestion >= 0 && parameters.currentQuestion < parameters.size"
            :class="[
              'w-5 h-5 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 flex-shrink-0',
              'bg-accent-success text-white ring-2 ring-accent-success/50'
            ]"
          >
            {{ parameters.currentQuestion + 1 }}
          </div>
          <!-- Show upcoming questions -->
          <div 
            v-for="n in Math.max(0, parameters.size - attempted.length - 1)" 
            :key="`upcoming-${n}`"
            class="w-5 h-5 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 flex-shrink-0 bg-dark-600 text-dark-300"
          >
            {{ attempted.length + n + 2 }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Pattern Area -->
    <div class="flex-1 flex items-center justify-center p-2 pb-4">
      <div class="max-w-xl mx-auto text-center w-full">
        <div v-if="currentPattern" class="space-y-4">
          <!-- Pattern Display -->
          <div class="surface-elevated p-3 animate-slide-up">
            
            <!-- Current Question Info -->
            <div v-if="!isQuestionComplete" class="text-center mb-3">
              <div class="text-sm text-dark-300 mb-1">
                Fill the {{ getCurrentBlankName() }} field
              </div>
            </div>
            
            <!-- Pattern Grid -->
            <div class="flex justify-center items-center space-x-3 mb-3">
              <div 
                v-for="(item, index) in displayedPattern" 
                :key="index"
                class="text-center"
              >
                <div class="text-xs text-dark-400 mb-1">{{ getColumnName(index) }}</div>
                <div 
                  :class="[
                    'w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold font-mono',
                    item !== null 
                      ? 'bg-accent-success/20 text-accent-success border-2 border-accent-success/30' 
                      : index === currentBlankColumn
                      ? 'bg-accent-warning/20 text-accent-warning border-2 border-accent-warning/50 border-dashed animate-pulse'
                      : 'bg-accent-primary/20 text-accent-primary border-2 border-accent-primary/50 border-dashed'
                  ]"
                >
                  <span v-if="item !== null">{{ item }}</span>
                  <span v-else-if="index === currentBlankColumn" class="text-accent-warning">?</span>
                  <span v-else class="text-dark-500">-</span>
                </div>
              </div>
            </div>

            <!-- Answer Input -->
            <div v-if="!showFeedback && currentBlankColumn !== null" class="space-y-2">
              <div class="relative max-w-xs mx-auto">
                <input
                  v-model="userInput"
                  @keydown="handleKeyPress"
                  :type="getInputType()"
                  :placeholder="getInputPlaceholder()"
                  class="input-field text-center text-lg w-full"
                  autocomplete="off"
                  maxlength="2"
                  ref="answerInput"
                >
              </div>
              
              <div class="flex justify-center">
                <button 
                  @click="submitAnswer"
                  :disabled="!userInput || userInput.toString().trim() === ''"
                  class="btn-primary text-xs px-4 py-1"
                  :class="{ 'opacity-50 cursor-not-allowed': !userInput || userInput.toString().trim() === '' }"
                >
                  {{ isQuestionComplete ? 'Submit' : 'Next' }} (Enter)
                </button>
              </div>
            </div>

            <!-- Feedback -->
            <div v-else-if="showFeedback" class="space-y-1 animate-bounce-in">
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
                <div class="flex justify-center space-x-2">
                  <span v-for="(answer, index) in getBlankIndices()" :key="index">
                    {{ getColumnName(answer) }}: 
                    <span class="font-bold text-accent-primary">{{ currentPattern[answer] }}</span>
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="text-center py-12">
          <div class="spinner w-8 h-8 mx-auto mb-4"></div>
          <div class="text-dark-300">Loading next pattern...</div>
        </div>
      </div>
    </div>
  </div>
</template>