<script setup>
import { ref, provide, watchEffect, onMounted } from 'vue'

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

const actions = ref({
  start: false,
  generate: false,
  restart: false,
  currentQuestion: -1,
})

const currentQuestion = computed(() => actions.value.currentQuestion)

const selectedOperations = ref([])

const expressions = ref([])
const attempted = computed(() => {
})

watchEffect(() => {
  expressions.value = expressions.value.filter(ex => {
    return ex.status != null
  })
  const index = expressions.value.length
  for(let i = index; i < parameters.value.size; i++) {
    console.log("i", i)
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
})

provide('parameters', parameters)
provide('lists', lists)
provide('selectedOperations', selectedOperations)
provide('expressions', expressions)
provide('actions', actions)

const cardRef = ref(null)
const modalRef = ref(null)

onMounted(() => {
  (() => {
    console.log("scroll2", modalRef, modalRef.value)
    modalRef.value.onscroll = () => {
      console.log("scroll")
      cardRef.value.prop('scrollTop', this.scrollTop)
    }
  })()
})

</script>
<template>
  <div class="flex bg:white h-full dark:bg-gray-900 pt-16">
    <div class="w-1/5">
      <OperationsSidebar />
    </div>
    <div class="w-4/5 relative max-h-full"
      ref="cardRef"
    >
      <OperationsQuestionsCards 
        v-if="actions.currentQuestion > -1"
      />
      <div
        ref="modalRef"
      >
      </div>
      <OperationsQuestions 
        v-if="actions.currentQuestion > -1"
      />
      <OperationsQuestionsStart 
        v-else
      />
    </div>
  </div>
</template>
