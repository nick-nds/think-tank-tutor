<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const route = useRoute()
const isScrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  window.addEventListener('scroll', handleScroll)
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
  { name: 'Operations', path: '/operations', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { name: 'Alphabet Patterns', path: '/alphabet-patterns', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' }
]
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'h-14 bg-dark-800/95 backdrop-blur-md border-b border-dark-600/50 shadow-xl' : 'h-16 bg-dark-800/90 backdrop-blur-sm border-b border-dark-600/30'
    ]"
  >
    <div class="container px-6 py-3 mx-auto h-full">
      <div class="flex items-center justify-between h-full">
        
        <!-- Logo/Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group" @click="closeMenu">
          <div class="relative">
            <div class="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-success rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span class="text-white font-bold text-sm">TT</span>
            </div>
            <div class="absolute -inset-1 bg-gradient-to-br from-accent-primary to-accent-success rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
          </div>
          <span class="text-dark-100 font-semibold text-lg hidden sm:block group-hover:text-white transition-colors duration-300">
            Think Tank
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="closeMenu"
            :class="[
              'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm relative group',
              route.path === item.path 
                ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
            </svg>
            <span>{{ item.name }}</span>
            
            <!-- Active indicator -->
            <div 
              v-if="route.path === item.path"
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-primary rounded-full"
            ></div>
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMenu"
            :class="[
              'lg:hidden p-2 rounded-xl transition-all duration-300',
              isOpen ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700'
            ]"
            aria-label="Toggle menu"
          >
            <svg 
              :class="['w-6 h-6 transition-transform duration-300', isOpen ? 'rotate-90' : '']" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!isOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div 
        v-if="isOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-dark-800/95 backdrop-blur-md border-b border-dark-600/50 shadow-xl"
      >
        <div class="container mx-auto px-6 py-6">
          <div class="space-y-3">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              @click="closeMenu"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group w-full',
                route.path === item.path 
                  ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                  : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50'
              ]"
            >
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
                route.path === item.path ? 'bg-accent-primary/20' : 'bg-dark-700 group-hover:bg-dark-600'
              ]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
                </svg>
              </div>
              <span>{{ item.name }}</span>
              
              <!-- Arrow for active item -->
              <svg 
                v-if="route.path === item.path"
                class="w-4 h-4 ml-auto text-accent-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
          
          <!-- Mobile Theme Toggle -->
          <div class="mt-6 pt-6 border-t border-dark-600/30">
            <button class="flex items-center space-x-3 px-4 py-3 rounded-xl text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 transition-all duration-300 font-medium w-full">
              <div class="w-8 h-8 bg-dark-700 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </div>
              <span>Dark Theme</span>
              <div class="ml-auto w-10 h-6 bg-accent-primary/20 rounded-full flex items-center px-1">
                <div class="w-4 h-4 bg-accent-primary rounded-full transition-transform duration-300 translate-x-4"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen"
        @click="closeMenu"
        class="lg:hidden fixed inset-0 bg-dark-900/50 backdrop-blur-sm -z-10"
      ></div>
    </Transition>
  </nav>
</template>
