<script setup>
import { ref, inject, provide } from 'vue'
import { alphabets } from '../composables/useGenerateAlphabets'

const title = inject('preTitle')
title.value = 'Matrix'


const getDefaultValue = () => {
  const row = alphabets[1]
  return [row[0], 1, row[1]]
}

const getCols = () => {
  return [true, false, false]
}

const parameters = ref({
  cols: getCols(),
  random: false,
  size: 10,
  currentQuestion: -1,
  defaultValue: getDefaultValue(),
  paused: false,
  end: false,
})

const positionsCount = computed(() => {
  return parameters.value.cols.reduce((total, c) => {
    return c + total
  }, 0)
})

const getActiveCols = () => {
  let cols = []
  parameters.value.cols.forEach((c, i) => {
    if(c === true) {
      cols.push(i)
    }
  })
  return cols
}

const matrix = computed(() =>{
  parameters.value.currentQuestion || true
  return useGenerateAlphabets(parameters.value.size)
})

const rows = (row) => {
  const activeCols = getActiveCols()
  if(parameters.value.random === true) {
    const randomCols = activeCols.map(c => {
      return useRandomIntFromInterval(0, parameters.value.cols.length - 1)
    })
    return row.map((r, index) => {
      return  randomCols.includes(index) ? r : null
    })
  } else {
    return row.map((r, index) => {
      return  activeCols.includes(index) ? r : null
    })
  }
}

const expressions = computed(() => {
  return matrix.value.map(alpha => {
    return rows(alpha)
  })
})

const attempted = ref([])

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
  <div class="flex bg:white h-full dark:bg-gray-900 pt-16">
    <MatrixParameters />
    <div class="absolute top-0 left-0 w-full h-full pt-36">
      <MatrixAttempted />
    </div>
    <div class="absolute top-0 left-0 w-full h-full pt-16">
      <MatrixRenderQuestions />
    </div>
  </div>
</template>

