/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0B3B7B',        // Dominant Tech Blue from Logo
          'primary-dark': '#072652', // Darker navy blue
          'primary-light': '#1E5BB0',// Brighter royal blue
          secondary: '#071E3D',      // Deep Midnight Navy from circuit background
          'secondary-dark': '#041021',
          accent: '#F26522',         // Circuit Orange swoop from Logo
          'accent-hover': '#D85413',
          'accent-light': '#FF8042',
          surface: '#FFFFFF',
          'surface-muted': '#F8FAFC',
          'surface-card': '#FFFFFF',
          border: '#E2E8F0',
          'border-dark': '#CBD5E1',
          text: '#0F172A',
          'text-muted': '#64748B',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0284C7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(11, 59, 123, 0.12)',
        'brand-lg': '0 10px 25px -3px rgba(11, 59, 123, 0.18)',
        'accent': '0 4px 15px -2px rgba(242, 101, 34, 0.25)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
