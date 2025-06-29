<script setup>
import { ref, provide, computed, watchEffect } from 'vue'

const preTitle = ref()

const title = computed(() => {
  let setTitle = 'Think Tank Tutor'
  if(preTitle.value) {
    setTitle = preTitle.value + ' - ' + setTitle
  }
  return setTitle
})

watchEffect(() => {
  useHead({
    title: title.value,
  })
})

provide('preTitle', preTitle)

</script>
<template>
  <div class="dark h-screen">
    <LayoutsApplayout>
      <NuxtPage />
    </LayoutsApplayout>
  </div>
</template>
