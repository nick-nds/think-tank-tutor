<script setup>
import { ref, inject, watchEffect, computed } from 'vue'

const expressions = inject('expressions')
const actions = inject('actions')
const currentQuestion = computed(() => actions.value.currentQuestion)

</script>
<template>
  <div class="flex flex-wrap">
    <!--OperationsQuestionsCard 
      v-for="(expression, index) in expressions"
      :expression="expression"
      :key="index"
      :index="index"
    /-->
    <OperationsQuestionsModal 
      :expression="expressions[currentQuestion]"
    />
  </div>
</template>
