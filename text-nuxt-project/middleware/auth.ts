// middleware/auth.js
import { useTokenStore } from '~/stores/token';

export default defineNuxtRouteMiddleware((to, from) => {
  const tokenStore = useTokenStore();
  
  if (!tokenStore.isLoggedIn && to.path !== '/') {
    return navigateTo('/');
  }
});
