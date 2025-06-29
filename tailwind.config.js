module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Minimalistic dark theme palette
        dark: {
          50: '#f8f9fa',   // Very light gray for text on dark
          100: '#e9ecef',  // Light gray for secondary text
          200: '#dee2e6',  // Border color
          300: '#ced4da',  // Disabled text
          400: '#6c757d',  // Muted text
          500: '#495057',  // Secondary text
          600: '#343a40',  // Card backgrounds
          700: '#212529',  // Surface backgrounds
          800: '#1a1d21',  // Primary backgrounds
          900: '#0d1117',  // Deep backgrounds
        },
        // Accent colors for the dark theme
        accent: {
          primary: '#3b82f6',   // Blue - primary actions
          success: '#22c55e',   // Green - success states
          warning: '#f59e0b',   // Amber - warnings
          error: '#ef4444',     // Red - errors
          info: '#06b6d4',      // Cyan - info
        }
      }
    }
  }
}
