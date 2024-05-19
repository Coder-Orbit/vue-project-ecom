// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/css/custom.css',
        '~/assets/css/main.css',
        'primevue/resources/themes/aura-light-green/theme.css',
        'primeicons/primeicons.css'

    ],

    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },

    modules : [
        'nuxt-auth-sanctum',
        'nuxt-primevue',
        '@pinia/nuxt',
        'nuxt-icon',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-editorjs',
        ['@nuxtjs/google-fonts', {
            families: {
              Roboto: true,
              Inter: [400, 700],
              'Josefin+Sans': true,
              Lato: [100, 300],
              Raleway: {
                wght: [100, 400],
                ital: [100]
              },
              Inter: '200..700',
              'Crimson Pro': {
                wght: '200..900',
                ital: '200..700',
              }
            }
        }],    
    ],

    sanctum: {
        baseUrl: 'https://ecom.coderorbit.com/public/api',
        redirect: {
        onLogin : 'dashboard',
        }
    },

    vite: {
        server:{
            host: true,
            port: 3000,
            watch: {
                usePolling: true,
            }
        },
        optimizeDeps: {
            include: ['@editorjs/editorjs'],
        },
    }
})
