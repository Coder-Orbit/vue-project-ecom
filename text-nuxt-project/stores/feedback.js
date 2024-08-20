export const useFeedbackStore = defineStore("feedback", {
    state: () => ({
        feedbacks: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            perPage: 15,
            totalItems: 0,
            links: [],
        },
    }),
    getters: {
        currentPage: (state) => state.pagination.currentPage,
        totalPages: (state) => state.pagination.totalPages,
        totalItems: (state) => state.pagination.totalItems,
        currentPage: (state) => state.pagination.currentPage,
    },
    actions:{
        // Show Feedbacks & Paginate In "/feedback" Page
        async getAllFeedbacks(page = 1) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/feedbacks?page=${page}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                this.feedbacks = data.data;
                console.log(this.feedbacks);
                this.pagination.currentPage = data.current_page;
                this.pagination.totalPages = data.total_pages;
                this.pagination.totalItems = data.total_items;
                this.pagination.links = data.links;
            } catch (error) {
                console.log(error);
            }
        },
        // Update Feedback In "/feedback" Page
        async updateFeedback(feedbackData, id) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            const fromData = feedbackData
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/feedbacks/${id}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${app_token}`,
                    },
                    body: JSON.stringify(fromData),
                });
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    }
});