<script setup>
import { ref, provide, watchEffect } from 'vue'

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

watchEffect(() => {
  parameters.value.regenerate || true
  lists.value.a = useGenerateList(parameters.value.range.a[0], parameters.value.range.a[1], parameters.value.size)
  lists.value.b = useGenerateList(parameters.value.range.b[0], parameters.value.range.b[1], parameters.value.size)
})

const selectedOperations = ref([])

const expressions = ref([])

watchEffect(() => {
  expressions.value = []
  for(let i = 0; i < parameters.value.size; i++) {
    const a = lists.value.a[i]
    const b = lists.value.b[i]
    const operator = selectedOperations.value.length > 0 ? useRandomizeArray(selectedOperations.value)[0] : 'add'
    expressions.value.push({
      a: a,
      b: b,
      operator: operator,
      value: useOperate(a, b, operator),
      status: null,
    })
  }
})

const actions = ref({
  start: false,
  generate: false,
  restart: false,
  currentQuestion: -1,
})

provide('parameters', parameters)
provide('lists', lists)
provide('selectedOperations', selectedOperations)
provide('expressions', expressions)
provide('actions', actions)

</script>
<template>
  <div class="flex bg:white dark:bg-gray-900">
    <div class="w-1/5">
      <OperationsSidebar />
    </div>
    <div class="w-4/5">
      <OperationsQuestions 
        v-if="actions.currentQuestion > -1"
      />
      <OperationsQuestionsStart 
        v-else
      />
    </div>
  </div>
</template>
