<script setup>
import { inject } from 'vue'

const parameters = inject('parameters')
</script>

<template>
  <div class="flex">
    <span>
      <!-- Start Button -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        v-if="parameters.currentQuestion < 0"
        @click="parameters.currentQuestion = 0"
        class="w-6 h-6 mx-2 stroke-0 fill-sky-600 hover:fill-gray-700 dark:fill-sky-400 dark:group-hover:fill-gray-900 cursor-pointer"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
      </svg>

      <!-- Stop Button -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        v-if="parameters.currentQuestion > -1"
        @click="parameters.currentQuestion = 0"
        class="w-6 h-6 mx-2 stroke-0 fill-sky-600 hover:fill-gray-700 dark:fill-sky-400 dark:group-hover:fill-gray-900 cursor-pointer"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
      </svg>
    </span>

    <span>
      <!-- Resume Button -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        v-if="parameters.currentQuestion > -1 && parameters.paused"
        @click="parameters.paused = false"
        class="w-6 h-6 mx-2 stroke-0 fill-sky-600 hover:fill-gray-700 dark:fill-sky-400 dark:group-hover:fill-gray-900 cursor-pointer"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
      </svg>

      <!-- Pause Button -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
        @click="parameters.paused = true"
        v-if="parameters.currentQuestion > -1 && !parameters.paused"
        class="w-6 h-6 mx-2 stroke-0 fill-sky-600 hover:fill-gray-700 dark:fill-sky-400 dark:group-hover:fill-gray-900 cursor-pointer"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
      </svg>
    </span>
  </div>
</template>
