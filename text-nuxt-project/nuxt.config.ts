// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/css/main.css',
        'primevue/resources/themes/aura-light-green/theme.css'

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
        '@pinia-plugin-persistedstate/nuxt'
    ],

    sanctum: {
        baseUrl: 'https://ecom.coderorbit.com/public/api',
        redirect: {
        onLogin : '/dashboard',
        }
    },

    vite: {
        server:{
        host: true,
        port: 3000,
        watch: {
            usePolling: true,
        }
        }
    }
})
