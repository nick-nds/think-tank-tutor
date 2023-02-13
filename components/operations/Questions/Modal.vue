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
        <div class="flex items-end justify-center px-4 text-center sm:block">
          <span class="hidden sm:inline-block sm:align-middle" aria-hidden="true">&#8203;</span>

          <div
            :class="resultClass"
            class="transition-shadow duration-500 relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-lg sm-max-h-lg sm:w-full"
            >
              <OperationsQuestionsRenderQuestion 
                :expression="props.expression"
                @answered="answered"
              />

          </div>
        </div>
    </Transition>
  </div>
</template>

