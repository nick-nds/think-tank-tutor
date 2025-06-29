<script setup>
import { inject, ref, onMounted } from 'vue'

/**
 * Enhanced Dashboard/Home page for Think Tank Tutor
 */
const title = inject('preTitle')
title.value = 'Think Tank Tutor'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const features = [
  {
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01m3 0h.01M9 11h.01m3 0h.01m3 0h.01M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
    title: 'Smart Operations',
    description: 'Adaptive difficulty based on your performance'
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time'
  },
  {
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    title: 'Focused Learning',
    description: 'Target specific areas for improvement'
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Instant Feedback',
    description: 'Get immediate results and explanations'
  }
]

const stats = [
  { number: '6', label: 'Operation Types', color: 'text-accent-primary' },
  { number: '∞', label: 'Practice Questions', color: 'text-accent-success' },
  { number: '26', label: 'Alphabet Patterns', color: 'text-accent-info' },
  { number: '100%', label: 'Free to Use', color: 'text-accent-warning' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50 pt-16 overflow-hidden">
    <!-- Hero Section -->
    <section class="relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-20 h-20 border border-accent-primary rounded-full animate-pulse-slow"></div>
        <div class="absolute top-40 right-20 w-16 h-16 border border-accent-success rounded-full animate-pulse-slow" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-40 left-20 w-12 h-12 border border-accent-info rounded-full animate-pulse-slow" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 right-10 w-24 h-24 border border-accent-warning rounded-full animate-pulse-slow" style="animation-delay: 0.5s;"></div>
      </div>

      <div class="container mx-auto px-4 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Main Title with Animation -->
          <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'">
            <h1 class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-primary via-accent-info to-accent-success bg-clip-text text-transparent leading-tight">
              Think Tank Tutor
            </h1>
            <div class="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-success mx-auto mb-8 rounded-full"></div>
          </div>
          
          <!-- Subtitle -->
          <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 0.2s;">
            <p class="text-xl md:text-2xl mb-8 text-dark-200 leading-relaxed">
              Master mathematics through intelligent practice and adaptive learning
            </p>
            <p class="text-lg text-dark-300 mb-12 max-w-2xl mx-auto">
              From basic arithmetic to complex matrix operations, enhance your skills with our interactive learning platform
            </p>
          </div>

          <!-- CTA Buttons -->
          <div :class="isLoaded ? 'animate-bounce-in' : 'opacity-0'" style="animation-delay: 0.4s;" class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <NuxtLink to="/operations" class="btn-primary text-lg">
              <span class="flex items-center gap-2">
                <span>Practice Operations</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </NuxtLink>
            <NuxtLink to="/alphabet-patterns" class="btn-secondary text-lg">
              <span class="flex items-center gap-2">
                <span>Practice Alphabets</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 border-y border-dark-600/30">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" 
               :class="isLoaded ? 'animate-slide-up' : 'opacity-0'"
               :style="`animation-delay: ${0.6 + index * 0.1}s`"
               class="text-center">
            <div :class="stat.color" class="text-3xl md:text-4xl font-bold mb-2">{{ stat.number }}</div>
            <div class="text-dark-300 text-sm md:text-base">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Cards Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div :class="isLoaded ? 'animate-fade-in' : 'opacity-0'" style="animation-delay: 1s;">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-dark-50">Why Choose Think Tank Tutor?</h2>
          <p class="text-center text-dark-300 mb-16 max-w-2xl mx-auto">
            Our platform combines proven learning techniques with modern technology to create an engaging educational experience
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div v-for="(feature, index) in features" :key="index"
               :class="isLoaded ? 'animate-slide-up' : 'opacity-0'"
               :style="`animation-delay: ${1.2 + index * 0.1}s`"
               class="card-hover text-center p-8">
            <div class="mb-4">
              <svg class="w-12 h-12 mx-auto text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-50">{{ feature.title }}</h3>
            <p class="text-dark-300">{{ feature.description }}</p>
          </div>
        </div>

        <!-- Main Learning Paths -->
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Operations Card -->
          <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 1.6s;">
            <NuxtLink to="/operations" class="card-interactive group block p-8 relative overflow-hidden">
              <!-- Background Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-accent-primary/20 rounded-xl flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-dark-50 mb-1">Operations Practice</h3>
                    <div class="badge-primary">Mathematical Operations</div>
                  </div>
                </div>
                
                <p class="text-dark-200 mb-6 leading-relaxed">
                  Master arithmetic operations with our adaptive practice system. From basic addition to complex roots and exponents, 
                  improve your computational skills with instant feedback and progress tracking.
                </p>
                
                <div class="space-y-3 mb-6">
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>6 operation types available</span>
                  </div>
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Customizable difficulty levels</span>
                  </div>
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Real-time performance feedback</span>
                  </div>
                </div>
                
                <div class="flex items-center text-accent-primary font-medium group-hover:text-blue-400 transition-colors duration-300">
                  <span>Start Practice</span>
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Alphabet Patterns Card -->
          <div :class="isLoaded ? 'animate-slide-up' : 'opacity-0'" style="animation-delay: 1.8s;">
            <NuxtLink to="/alphabet-patterns" class="card-interactive group block p-8 relative overflow-hidden">
              <!-- Background Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-accent-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-accent-success/20 rounded-xl flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-dark-50 mb-1">Alphabet Patterns</h3>
                    <div class="badge-success">Memory Training</div>
                  </div>
                </div>
                
                <p class="text-dark-200 mb-6 leading-relaxed">
                  Master the alphabet-number relationships and reverse patterns. Learn associations like A=1=Z, B=2=Y, 
                  and strengthen your memory through interactive exercises with customizable difficulty.
                </p>
                
                <div class="space-y-3 mb-6">
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Learn letter-number associations</span>
                  </div>
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Practice reverse alphabet patterns</span>
                  </div>
                  <div class="flex items-center text-dark-300">
                    <svg class="w-4 h-4 text-accent-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Hide/show columns for challenge</span>
                  </div>
                </div>
                
                <div class="flex items-center text-accent-success font-medium group-hover:text-green-400 transition-colors duration-300">
                  <span>Start Learning</span>
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
