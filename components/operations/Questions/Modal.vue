<script setup>
import { ref, inject, Transition, watchEffect } from 'vue'

const props = defineProps(['expression'])
const isOpen = ref(true)

watchEffect(() => {
  console.log("watch 2", props.expression)
})

const resultClass = ref('border-4 border-gray-400 shadow-[0_0_20px,inset_0_0_20px] shadow-gray-400')

const answered = (st) => {
  if(st === true) {
    resultClass.value = 'border-4 border-green-500 shadow-[0_0_20px,inset_0_0_20px] shadow-green-500'
  } else {
    resultClass.value = 'border-4 border-red-500 shadow-[0_0_20px,inset_0_0_20px] shadow-red-500'
  }
  setTimeout(() => {
    resultClass.value = 'border-4 border-gray-400 shadow-[0_0_20px,inset_0_0_20px] shadow-gray-400'
  }, 500)
}

</script>

<template>
  <div x-data="{ isOpen: true }" class="relative flex justify-center w-full">

    <Transition type="transition" enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      enter-to-class="translate-y-0 opacity-100 sm:scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 sm:scale-100"
      leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95">
        <div class="flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle" aria-hidden="true">&#8203;</span>

          <div
            :class="resultClass"
            class="transition-shadow duration-500 relative inline-block p-20 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-lg sm-max-h-lg sm:w-full">
            <div>
              <OperationsQuestionsRenderQuestion 
                :expression="props.expression"
                @answered="answered"
              />
            </div>

            <div class="mt-5 sm:flex sm:items-center sm:justify-between">

              <div class="sm:flex sm:items-center ">
                <button @click="isOpen = false"
                  class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                  Pause
                </button>

                <button
                  class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
    </Transition>
  </div>
</template>

