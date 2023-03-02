<script setup>
import { inject } from 'vue'

const expressions = inject('expressions')
const matrix = inject('matrix')
const parameters = inject('parameters')

const question = computed(() => {
  return expressions.value[parameters.value.currentQuestion]
})

</script>
<template>
  <section class="bg-white dark:bg-gray-900 w-full">
    <div class="container px-6 py-10 mx-auto relative">
      <MatrixRenderQuestions
        :question="question"
      />
    </div>
  </section>
</template>
