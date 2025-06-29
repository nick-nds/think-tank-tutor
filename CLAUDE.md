# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Think Tank Tutor" - an educational Nuxt 3 Vue.js application for practicing mathematical operations and alphabet pattern exercises. The app provides two main learning modes:

- **Operations Mode**: Practice arithmetic (add, subtract, multiply, divide, exponent, root) with configurable parameters
- **Alphabet Patterns Mode**: Learn alphabet-number associations (A=1=Z, B=2=Y, etc.) with column visibility controls for memory training

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static files
npm run generate

# Start production server
npm run start
```

## Architecture Overview

### Technology Stack
- **Framework**: Nuxt 3.13+ with Vue.js 3 Composition API
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: nuxt-icons with custom SVG paths
- **State Management**: Vue 3 provide/inject pattern
- **Node.js**: Requires Node.js v16+ (tested with v22)

### Key Directories
- `/pages/` - Main routes (index.vue, operations.vue, alphabet-patterns.vue)
- `/components/` - Modular Vue components organized by feature
  - `/layouts/` - Navigation and app layout
  - `/operations/` - Mathematical operations components
  - `/alphabet-patterns/` - Alphabet pattern training components
- `/composables/` - Business logic and utility functions

### State Management Pattern
Both main pages use Vue 3's Composition API with provide/inject for state management:

**Operations Page**: Manages parameters (ranges, size), operation lists, expressions, and UI actions through reactive state objects.

**Alphabet Patterns Page**: Handles alphabet pattern generation, column visibility, attempted answers, and progress tracking.

### Mathematical Operations
- **Core Operations**: Addition, subtraction, multiplication, division, exponentiation, root
- **Precision Handling**: Special rounding for division (4 decimals) vs other operations (2 decimals)
- **Smart Generation**: Root operations use special list generation to ensure valid results

### Component Architecture
- **Modular Design**: Components are organized by feature with clear separation
- **Reactive Updates**: Uses watchEffect for automatic question generation
- **Visual Feedback**: Border color changes for answer validation
- **Focus Management**: Automatic input progression in matrix mode

## Important Implementation Details

### Mathematical Accuracy
- Division operations round to 4 decimal places (useRoundDivide.js) to prevent floating-point errors
- Root operations have special list generation to ensure valid mathematical results
- All other operations round to 2 decimal places (useRound.js)

### Alphabet Patterns System
- Uses alphabet-number mappings (A=1=Z, B=2=Y, etc.) with 26 predefined combinations
- Column visibility system allows hiding/showing different parts of the pattern
- Random mode shuffles which columns are displayed for increased difficulty
- Helps memorize letter positions and their reverse alphabet counterparts

### State Reactivity
- Operations page regenerates questions automatically when parameters change
- Alphabet Patterns page dynamically updates display based on column selection
- Both pages maintain session state for progress tracking and restart functionality