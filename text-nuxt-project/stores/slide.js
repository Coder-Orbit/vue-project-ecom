export const useSlideStore = defineStore("slide", {
  state: () => ({
    loading: false,
    status: null,
  }),
  getters: {
    status: (state) => state.status,
    isLoading: (state) => state.loading,
  },
  actions: {
    async addSlide(slideData) {
      // replace with actual API endpoint and master key
      const config = useRuntimeConfig();
      const EndPoint = config.public.baseURl;
      const MasterKey = config.public.masterToken;
      const app_token = useTokenStore().getToken;
      const formData = slideData;
      this.loading = true;
      try {
        const res = await fetch(`${EndPoint}/admin/${MasterKey}/slide`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${app_token}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data && data["0"] === "Success") {
          return { success: true };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred during login' };
      } finally {
        this.loading = false;
      }
    },
  },
});
