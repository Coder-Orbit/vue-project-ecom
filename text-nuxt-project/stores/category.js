export const useCategoryStore = defineStore("category", {
    state: () => ({
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
                console.log(formData);
                if (data && data[0] === "Success") {
                    return { success: true, message: 'Category Added Successfully' };
                } else {
                    return { success: false, message: 'Something is Wrong' };
                }
            } catch (error) {
                console.log(error);
                return { success: false, message: 'An error Occurred During Add Category' };
            }
        },


        // Add Categories In "/category/create" Page
        async updateCategory(categoryData) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            const formData = categoryData;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category/${formData.id}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                console.log(data);
                if (data && data[0] === "Success") {
                    return { success: true, message: 'Category Added Successfully' };
                } else {
                    return { success: false, message: 'Something is Wrong' };
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
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category?relative=categories&page=${page}&limit_per_page=${this.pagination.perPage}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                const data = await res.json();
                console.log("Data:>",data);
                this.categories = data.data;
                this.pagination.currentPage = data.current_page;
                this.pagination.totalPages = data.last_page;
                this.pagination.totalItems = data.total;
                this.pagination.links = data.links;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
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
                if (data === "Success") {
                    return { success: true, message: 'Category Deleted Successfully' };
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
                const data = await $fetch(`${EndPoint}/admin/${MasterKey}/category?limit_per_page=10`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                this.CategoryList = data.data;
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
        // Get Filterd Data In "/category" Page
        async getFilteredCategoriList(filteredName) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const data = await $fetch(`${EndPoint}/admin/${MasterKey}/category?name=${filteredName}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                    },
                });
                this.CategoryList = data;
            } catch (error) {
                console.log(error);
            }
        },
        //Filtered Category Data In "/Category/"Page
        async filterdData(categoryName, categoryStatus) {
            const config = useRuntimeConfig();
            const EndPoint = config.public.baseURl;
            const MasterKey = config.public.masterToken;
            const app_token = useTokenStore().getToken;
            try {
                const res = await fetch(`${EndPoint}/admin/${MasterKey}/category?${categoryName ? `name=${categoryName}` : ''}${categoryName && categoryStatus ? '&' : ''}${categoryStatus ? `status=${categoryStatus}` : ''}`, {
                    method: 'GET',
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${app_token}`,
                    }
                  });
              const data = await res.json();
              return data;
            } catch (error) {
              console.log(error);
              return { success: false, message: 'An error occurred during filtering' };
            }
          },
        //   async filterdData(categoryName, categoryStatus, CategoryCommition) {
        //     const config = useRuntimeConfig();
        //     const EndPoint = config.public.baseURl;
        //     const MasterKey = config.public.masterToken;
        //     const app_token = useTokenStore().getToken;
        
        //     try {
        //         const url = `${EndPoint}/admin/${MasterKey}/category?${
        //             categoryName ? `name=${categoryName}&` : ''
        //         }${categoryStatus ? `status=${categoryStatus}&` : ''}${
        //             CategoryCommition ? `commission=${CategoryCommition}` : ''
        //         }`; // Remove trailing '&' if present
        
        //         const res = await fetch(url, {
        //             method: 'GET',
        //             headers: {
        //                 Accept: "application/json",
        //                 "Content-Type": "application/json",
        //                 Authorization: `Bearer ${app_token}`,
        //             },
        //         });
        
        //         const data = await res.json();
        //         return data;
        //     } catch (error) {
        //         console.log(error);
        //         return { success: false, message: 'An error occurred during filtering' };
        //     }
        // }
          // Fetch Filtered Category Data
        // async fetchFilteredCategories(categoryName = "", categoryStatus = "") {
        //     const config = useRuntimeConfig();
        //     const EndPoint = config.public.baseURl;
        //     const MasterKey = config.public.masterToken;
        //     const app_token = useTokenStore().getToken;
        
        //     try {
        //     const url = new URL(`${EndPoint}/admin/${MasterKey}/category?name=${categoryName}&status=${categoryStatus}`);
        //     // if (categoryName) url.searchParams.append("name", categoryName);
        //     // if (categoryStatus) url.searchParams.append("&status", categoryStatus);
        
        //     const res = await fetch(url.toString(), {
        //         method: "GET",
        //         headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${app_token}`,
        //         },
        //     });
        
        //     if (!res.ok) {
        //         throw new Error(`Failed to fetch: ${res.statusText}`);
        //     }
        
        //     const data = await res.json();
        //     return data;
        //     } catch (error) {
        //     console.error("Error fetching filtered categories:", error);
        //     return { success: false, message: "An error occurred while fetching data" };
        //     }
        // },
        
    },
        
});