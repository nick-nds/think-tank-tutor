<template>
  <aside class="flex h-full">

    <OperationsSidebarSymbols />

    <div
      class="py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
        <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Parameters</h2>

      <div class="mt-8 space-y-4">
        <OperationsSidebarParameter />
      </div>

      <div class="mt-8">
        <OperationsSidebarActions />
      </div>
    </div>
  </aside>
</template>
