<script setup>
import { ref, provide, watchEffect, onMounted, inject } from 'vue'

const title = inject('preTitle')
title.value = 'Operations'

const parameters = ref({
  range: {
    a: [ 1, 10 ],
    b: [ 1, 10 ],
  },
  size: 10,
  regenerate: false,
})

const lists = ref({
  a: [],
  b: [],
})

const actions = ref({
  start: false,
  generate: false,
  restart: false,
  currentQuestion: -1,
  complete: false,
  direction: true,
})

const selectedOperations = ref([])

const expressions = ref([])

watchEffect(() => {
  if(!actions.value.complete) {
    expressions.value = expressions.value.filter(ex => {
      return ex.status != null
    })
    const index = expressions.value.length
    for(let i = index; i < parameters.value.size; i++) {
      const a = lists.value.a[i]
      const b = lists.value.b[i]
      const operator = selectedOperations.value.length > 0 ? useRandomizeArray(selectedOperations.value)[0] : 'add'
      expressions.value.push({
        a: a,
        b: b,
        operator: operator,
        value: useOperate(a, b, operator),
        status: null,
        answer: null,
      })
    }
  }
})

watchEffect(() => {
  parameters.value.regenerate || true
  lists.value.b = useGenerateList(parameters.value.range.b[0], parameters.value.range.b[1], parameters.value.size)
  if(selectedOperations.value.length == 1 && selectedOperations.value[0] == 'root') {
    lists.value.a = useGenerateRootList(parameters.value.range.a[0], parameters.value.range.a[1], lists.value.b, parameters.value.size)
  } else {
    lists.value.a = useGenerateList(parameters.value.range.a[0], parameters.value.range.a[1], parameters.value.size)
  }
})

watchEffect(() => {
  if(actions.value.restart === true) {
    parameters.value.regenerate = !parameters.value.regenerate
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

const cardRef = ref(null)
const modalRef = ref(null)

</script>
<template>
  <div class="flex bg:white h-full dark:bg-gray-900 pt-16">
    <div class="w-1/5">
      <OperationsSidebar />
    </div>
    <div class="w-4/5 relative max-h-full">
      <OperationsQuestionsCards 
        v-if="actions.currentQuestion > -1"
      />
        <OperationsQuestions 
          v-if="actions.currentQuestion > -1 && !actions.complete"
        />
        <OperationsQuestionsStart 
          v-if="actions.currentQuestion == -1 && !actions.complete"
        />
    </div>
  </div>
</template>
