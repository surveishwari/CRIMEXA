/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F8FAFC',    /* slate-50 */
        'bg-secondary': '#FFFFFF',  /* white */
        'bg-card': '#FFFFFF',
        'border': '#E2E8F0',        /* slate-200 */
        'text-primary': '#0F172A',  /* slate-900 */
        'text-muted': '#64748B',    /* slate-500 */
        'primary': '#2563EB',       /* blue-600 */
        'primary-hover': '#1D4ED8', /* blue-700 */
        'red': '#EF4444',
        'amber': '#F59E0B',
        'green': '#10B981',
        'cyan': '#06B6D4'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['ui-monospace', 'monospace']
      },
      boxShadow: {
        'clean': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
