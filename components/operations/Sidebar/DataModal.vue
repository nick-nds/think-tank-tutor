<script setup>
import { ref, Transition, inject } from 'vue'

const isOpen = ref(false)

const lists = inject('lists')
const parameters = inject('parameters')

</script>

<template>
  <div x-data="{ isOpen: true }" class="relative flex justify-center">
    <button @click="isOpen = true"
      class="py-2 tracking-wide text-blue-500 capitalize transition-colors duration-300 transform no-underline hover:underline">
      Show Data
    </button>

    <Transition type="transition" enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      enter-to-class="translate-y-0 opacity-100 sm:scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 sm:scale-100"
      leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
    >
      <div v-show="isOpen" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div @click="isOpen = false" class="fixed inset-0 z-12 overflow-y-auto">
        </div>
        <div class="flex items-end z-11 justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle" aria-hidden="true">&#8203;</span>

          <div
            class="relative mt-20 inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-top transition-all transform bg-white rounded-lg shadow-xl rtl:text-right border dark:bg-gray-900 w-3/5 sm:p-6">
            <div>
              <div class="flex items-center gap-x-2 justify-center">
                <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                  Generated Data</h3>
              </div>

              <div class="mt-2">
                <OperationsSidebarList 
                  v-for="(list, key) in lists"
                  :key="key"
                  :index="key"
                  :list="list"
                />
              </div>
            </div>

              <OperationsSidebarLength />

            <div class="mt-5 sm:flex sm:items-center sm:justify-between">

              <div class="sm:flex sm:items-center ">
                <button
                  @click="parameters.regenerate = !parameters.regenerate" 
                  class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                  Regenerate
                </button>

                <button @click="isOpen = false"
                  class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
