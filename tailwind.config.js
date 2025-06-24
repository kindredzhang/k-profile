/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
      },
      // 这里是关键！配置 typography 插件
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': 'var(--primary)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-counters': theme('colors.gray[600]'),
            '--tw-prose-bullets': 'var(--border)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--muted-foreground)',
            '--tw-prose-quote-borders': 'var(--primary)',
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': 'var(--primary)',
            '--tw-prose-pre-code': '#d4d4d4',
            '--tw-prose-pre-bg': '#1e1e1e',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            '--tw-prose-invert-body': 'var(--foreground)',
            '--tw-prose-invert-headings': 'var(--foreground)',
            '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': 'var(--primary)',
            '--tw-prose-invert-bold': 'var(--foreground)',
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': 'var(--border)',
            '--tw-prose-invert-hr': 'var(--border)',
            '--tw-prose-invert-quotes': 'var(--muted-foreground)',
            '--tw-prose-invert-quote-borders': 'var(--primary)',
            '--tw-prose-invert-captions': theme('colors.pink[400]'),
            '--tw-prose-invert-code': 'var(--primary)',
            '--tw-prose-invert-pre-code': '#d4d4d4',
            '--tw-prose-invert-pre-bg': '#1e1e1e',
            '--tw-prose-invert-th-borders': 'var(--border)',
            '--tw-prose-invert-td-borders': 'var(--border)',
            maxWidth: '65ch',
            a: {
              textDecoration: 'underline',
              fontWeight: '500',
              textUnderlineOffset: '2px',
              '&:hover': {
                textDecoration: 'none',
              },
            },
            'pre': {
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            ':where(:not(pre) > code)': {
                backgroundColor: 'rgba(134, 140, 160, 0.1)',
                padding: '0.2em 0.4em',
                borderRadius: '0.3em',
            },
            'img': {
              borderRadius: '0.5rem',
              marginTop: '2em',
              marginBottom: '2em',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
              },
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}