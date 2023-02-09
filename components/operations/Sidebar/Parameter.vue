<script setup>
import { inject } from 'vue'

const parameters = inject('parameters')
console.log("inject params", parameters.value)

</script>
<template>
  <div class="px-4">
    <OperationsSidebarRange 
      v-for="(range, key) in parameters.range"
      :key="key"
      :index="key"
      :range="range"
    />
    <br />
    <OperationsSidebarLength />
    <div class="my-4">
      <OperationsSidebarDataModal />
    </div>
    <div class="my-6">
      <OperationsSidebarActions />
    </div>
  </div>
</template>
