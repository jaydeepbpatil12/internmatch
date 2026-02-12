/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                // Gradient animations
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',

                // Floating and hover effects
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delay': 'float 6s ease-in-out 3s infinite',

                // Shimmer and shine effects
                'shimmer': 'shimmer 2s linear infinite',
                'shine': 'shine 3s ease-in-out infinite',

                // Pulse and glow effects
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',

                // Slide animations
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-down': 'slide-down 0.5s ease-out',
                'slide-left': 'slide-left 0.5s ease-out',
                'slide-right': 'slide-right 0.5s ease-out',

                // Fade animations
                'fade-in': 'fade-in 0.5s ease-in',
                'fade-in-up': 'fade-in-up 0.6s ease-out',
                'fade-in-down': 'fade-in-down 0.6s ease-out',

                // Scale animations
                'scale-in': 'scale-in 0.5s ease-out',
                'scale-up': 'scale-up 0.3s ease-out',

                // Bounce and wiggle
                'bounce-slow': 'bounce 3s infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',

                // Rotation
                'spin-slow': 'spin 3s linear infinite',
                'spin-slower': 'spin 8s linear infinite',

                // Text effects
                'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
                'typing': 'typing 3.5s steps(40, end)',

                // Background effects
                'bg-pan': 'bg-pan 8s ease infinite',
                'tilt': 'tilt 10s infinite linear',
            },
            keyframes: {
                // Gradient keyframes
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center center'
                    }
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },

                // Float keyframes
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },

                // Shimmer keyframes
                'shimmer': {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' }
                },
                'shine': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },

                // Glow keyframes
                'glow': {
                    '0%': { boxShadow: '0 0 5px rgba(34, 197, 94, 0.2), 0 0 10px rgba(34, 197, 94, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4)' }
                },
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                        filter: 'brightness(1)'
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)',
                        filter: 'brightness(1.2)'
                    }
                },

                // Slide keyframes
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-left': {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },
                'slide-right': {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },

                // Fade keyframes
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },

                // Scale keyframes
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'scale-up': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' }
                },

                // Wiggle keyframes
                'wiggle': {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' }
                },

                // Text shimmer keyframes
                'text-shimmer': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },

                // Typing keyframes
                'typing': {
                    'from': { width: '0' },
                    'to': { width: '100%' }
                },

                // Background pan keyframes
                'bg-pan': {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '-200% center' }
                },

                // Tilt keyframes
                'tilt': {
                    '0%, 50%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(1deg)' },
                    '75%': { transform: 'rotate(-1deg)' }
                }
            },
            // Custom colors for gradients
            colors: {
                'green': {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
            },
            // Custom backdrop blur
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
