<script setup>
import { ref, inject, Transition, watchEffect } from 'vue'

const props = defineProps(['expression'])
const isOpen = ref(true)

const actions = inject('actions')

watchEffect(() => {
  console.log("watch 2", props.expression)
})

const ltrClick = () => {
  console.log("click", actions.value.direction)
  actions.value.direction = !actions.value.direction
}

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
              <button @click="actions.direction = !actions.direction" class="flex items-center px-4 py-2 font-medium tracking-wide text-rose-600 capitalize transition-colors duration-300 border-2 border-transparent hover:text-rose-900 hover:border-2 hover:border-rose-900 transform rounded-lg">
                <span v-if="actions.direction" class="mx-2">LTR</span>
                <span v-else class="mx-2">RTL</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" 
                  class="w-4 h-4 stroke-0"
                >
                  <path v-if="actions.direction" stroke-linecap="round" stroke-linejoin="round"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>

            </div>
          </div>
        </div>
    </Transition>
  </div>
</template>

