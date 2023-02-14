<script setup>
import { inject } from 'vue'

const title = inject('preTitle')
title.value = 'Dashboard'

</script>
<template>
<h1>Page</h1>
</template>
