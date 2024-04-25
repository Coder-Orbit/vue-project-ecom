// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
