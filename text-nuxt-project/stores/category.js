export const useCategoryStore = defineStore("category", {
    state: () => ({
        status: null,
        loading: false,
        CategoryList: [],
        categories: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            perPage: 15,
            totalItems: 0,
            links: [],
        },
    }),
    getters: {
        status: (state) => state.status,
        isLoading: (state) => state.loading,
        currentPage: (state) => state.pagination.currentPage,
        totalPages: (state) => state.pagination.totalPages,
        totalItems: (state) => state.pagination.totalItems,
        currentPage: (state) => state.pagination.currentPage,
    },
    actions: {
        // Add Categories In "/category/create" Page
        async addCategory(categoryData) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            const formData = categoryData;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data && data[0] === "Success") {
                    return { success: true };
                } else {
                    return { success: false, message: 'Invalid credentials' };
                }
            } catch (error) {
                console.log(error);
                return { success: false, message: 'An error Occurred During Add Category' };
            }
        },
        // Show Categories & Paginate In "/category" Page
        async getAllCategories(page = 1) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            this.loading = true;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category?page=${page}&limit_per_page=${this.pagination.perPage}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                if (data && data.status === "Success") {
                    this.CategoryList = data.data;
                    this.pagination.currentPage = data.meta.current_page;
                    this.pagination.totalPages = data.meta.total_pages;
                    this.pagination.totalItems = data.meta.total_items;
                    this.pagination.links = data.links;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.status = data.message;
                }
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.status = 'An error occurred during login';
            }
        },
        // Delete Category In "/category" Page
        async deleteCategory(id) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category/${id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                if (data && data.status === "Success") {
                    return { success: true };
                } else {
                    return { success: false, message: 'Invalid credentials' };
                }
            } catch (error) {
                console.log(error);
                return { success: false, message: 'An error occurred during login' };
            }
        },
        // Get Category List In "/category/" Page
        async getCategoryList() {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                this.categories = data.data;
            } catch (error) {
                console.log(error);
            }
        },
        //SingleShow Category In "/category/:id" Page
        async getSingleCategory(id) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category/${id}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});