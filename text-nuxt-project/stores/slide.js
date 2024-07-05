export const useSlideStore = defineStore("slide", {
  state: () => ({
    loading: false,
    status: null,
    slides: [],
  }),
  getters: {
    isLoading: (state) => state.loading,
    status: (state) => state.status,
    slides: (state) => state.slides,
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
        // Update status based on response data
        if (data && data[0] === 'Success') {
            this.status = 'Success';
            this.slides.push(data.store_data);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        this.status = 'Failed';
      } finally {
        this.loading = false;
      }
    },
  },
});
