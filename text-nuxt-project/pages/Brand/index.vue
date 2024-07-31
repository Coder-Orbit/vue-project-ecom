<script setup>
    import InputGroup from 'primevue/inputgroup';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Toast from 'primevue/toast';
    import { useDataDate } from '~/composables/useDataDate';
    import { useBrandStore } from '~/stores/brand';

    //Define Page Meta
    definePageMeta({
        layout: "dashboard",
        middleware: ['auth'],
    })
    // Brand Row data And Pagination From Store
    const store = useBrandStore();
    const brandData = computed(() => store.brands);
    const pagination = computed(() => store.pagination);
    //For Loading Component
    const isLoading = ref('success');
    //For Right Side Filter
    const visibleRight = ref(false);
    //delete
    const selectedbrandId = ref(null);
    const deleteModalVisible = ref(false);
    const deleteLoading = ref(false);
    //Pagination Initial PageNumber
    const pageNumber = ref(1);
    // Initialize Toast
    const toast = useToast();
    // Date Formatter
    const { dateMonthFunction } = useDataDate();
    // On Load or Reload Get New Updated Data
    const loadBrands = async () => {
        isLoading.value = 'Loading';
        await store.getAllBrands(pageNumber.value, store.pagination.perPage);
        brandData.value = store.brands;
        isLoading.value = 'success';
    };
    // Ensure data is loaded before the component mounts
    onBeforeMount(async () => {
    await loadBrands();
    });
    // Watch for changes in the store Brand and update BrandData accordingly
    watch(
    () => store.brands,
    (newbrands) => {
        brandData.value = newbrands;
    }
    );
    // Watch PageNumber Change
    watch(pageNumber,async (newPage) => {
    isLoading.value = 'loading';
    await store.getAllBrands(newPage, pagination.value.perPage);
    isLoading.value = 'success';
    });
    // OnPage Change Get New Data
    const onPageChange = (newPage) => {
        pageNumber.value = newPage;
        store.getAllBrands(pageNumber.value, pagination.value.perPage);
    };
    // On Search Get New Brand Data
    const handleSearch = () => {
        pageNumber.value = 1;
        store.getAllBrands(pageNumber.value, store.pagination.perPage);
    };
    // On Apply Filter Get New Brand Data
    const goToPage = (page) => {
        if (page > 0 && page <= pagination.value.totalPages) {
            pageNumber.value = page;
            store.getAllBrands(pageNumber.value, pagination.value.perPage);
        }
    };
    // Handle Delete Brand
    const handleDelete = async () => {
        deleteLoading.value = true;
        const result = await store.deleteBrand(selectedbrandId.value);
        console.log(result);
        deleteLoading.value = false;
        deleteModalVisible.value = false;
        toast.add({
            severity: result.success ? 'success' : 'error',
            summary: result.success ? 'Success' : 'Error',
            detail: result.message,
            life: 3000,
        });
        // Reload the Brands after deletion
        if (result.success) {
            await loadBrands();
        }
    };
    // Open the delete modal for the specific Brand
    const openDeleteModal = (brandId) => {
        selectedbrandId.value = brandId;
        deleteModalVisible.value = true;
    };
</script>
<template>
        <NuxtLayout :name="layout">
            <Toast/>
            <Spiner :loading = isLoading />
            <div class="w-full px-3 mt-1">

                <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                    <!-- Header with Back, Filter, and Add Buttons -->
                    <div class="flex w-full justify-between bg-gray-400 text-white">
                        
                        <div class="font-semibold mt-1 ml-3">Brand</div>
                        <div class="font-semibold ml-1 flex">
                            <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
                                <Icon name="gg:arrow-left-o"></Icon>
                                Back
                            </button>

                            <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform  hover:text-black px-4 py-1 text-sm " @click="visibleRight = true">
                                <Icon name="iconoir:filter-solid"></Icon>
                                Filter
                            </button>
                            <NuxtLink to="brand/create" class="bg-cyan-600 hover:bg-cyan-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-rt-sm">
                                <Icon name="zondicons:add-outline"></Icon>
                                Add
                            </NuxtLink>
                        </div>
                        
                    </div>

                    <!-- Table list goes here -->
                    <div class=" h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
                        <table class="table-fixed w-full">
                            <!-- Table Headers -->
                            <thead>
                                <tr class="w-full bg-gray-300 text-sm">
                                    <th class="p-1 text-left text-sm w-8">SL</th>
                                    <th class="p-1 text-left text-sm w-12">Icon</th>
                                    <th class="p-1 text-left text-sm">Name</th>
                                    <th class="p-1 text-left text-sm">Commission</th>
                                    <th class="p-1 text-left text-sm">Commission Type</th>
                                    <th class="p-1 text-left">Status</th>
                                    <th class="p-1 text-left">Created Date</th>
                                    <th class="p-1 text-center">Created By</th>
                                    <th class="p-1 text-center w-24">...</th>
                                </tr>
                            </thead>
                            <!-- Table Body -->
                            <tbody>
                                <tr v-for="brand in brandData" :key="brand.unique_id" class="bg-white odd:bg-gray-100">
                                    <!-- Serial ID -->
                                    <td class="p-1 text-center text-xs">{{ brand.id }}</td>
                                    <!-- Icon -->
                                    <td class="p-1 text-left text-xs">
                                        <img :src="brand.icon" class="w-8 h-8" alt="Brand Icon">
                                    </td>
                                    <!-- Brand Name -->
                                    <td class="p-1 text-left text-xs">{{brand.name}}</td>
                                    <!--Commission-->
                                    <td class="p-1 text-left text-xs">{{ brand.commission }}</td>
                                    <!--Commission_Type-->
                                    <td class="p-1 text-left text-xs">{{ brand.commission_type }}</td>
                                    <!--Status-->
                                    <td class="p-1 text-left text-xs">{{ brand.status }}</td>
                                    <!--Created Date-->
                                    <td class="p-1 text-left text-xs">{{  dateMonthFunction(brand.created_at)  }}</td>
                                    <!--Creaeted By-->
                                    <td class="p-1 text-center text-xs">{{ brand.created_by =='1' ? "Admin": "Majedul Islam" }}</td>
                                    <!-- & Other Buttons-->
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit">
                                            <nuxt-link :to="`/brand/${brand.id}`"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></nuxt-link>
                                        </div>
                                        <button @click="openDeleteModal(brand.id)" class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Table Footer-->
                    <div class="order_title text-sm flex justify-between h-full">
                        <!-- Search Box -->
                        <div class="mt-[2px] ml-3">
                            <InputGroup>
                            <input type="number" v-model="pageNumber" @keyup.enter="goToPage(pageNumber)" class="border border-r-0 p-1 focus:outline-none" placeholder="Page Number" />
                            <icon class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer" name="nonicons:go-16" color="#000" @click="goToPage(pageNumber)" />
                            </InputGroup>
                        </div>
                        <!-- Pagination -->
                        <div class="pt-2">
                            <Pagination
                            :currentPage="pageNumber"
                            :totalPages="pagination.totalPages"
                            :links="pagination.links"
                            @paginate="onPageChange"
                            />
                        </div>
                    </div>
                </div>

                <Sidebar v-model:visible="visibleRight" header="Brand Filter" position="right">
                    <div class="w-full">
                        <label for="dd-city" class="text-sm w-full">Brand Name</label>
                        <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Brand Name"/>
                    </div>
                    <div class="w-full mt-2">
                        <label for="dd-city" class="text-sm w-full">Status</label>
                        <select name="status" id="commission_type" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
                            <option value="1"> Active</option>
                            <option value="0"> Inactive</option>
                        </select>
                    </div>

                    <div class="font-semibold flex mt-2 place-content-end">
                        

                        <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform  hover:text-black px-4 py-1 text-sm rounded-md" @click="visibleRight = true">
                            <Icon name="fluent:search-12-filled"></Icon>
                            Search
                        </button>
                        
                    </div>



                </Sidebar>

                <!-- Delete Modal -->
                <Dialog v-model:visible="deleteModalVisible" modal header="Delete Brand" :style="{ width: '25rem' }">
                    <span class="p-text-secondary flex items-center justify-center flex-col mb-5">
                        <Icon name="material-symbols:delete-sweep-rounded" width="120px" height="120px" class="mr-2 text-red-500" />
                        Are you sure you want to delete this Brand?
                    </span>
                    <div class="flex justify-around">
                        <Button class="bg-yellow-600 text-red-100 px-4 py-2" type="button" label="Cancel" severity="secondary" @click="deleteModalVisible = false"></Button>
                        <Button class="bg-red-600 text-red-100 px-4 py-2" type="button" label="Delete" @click="handleDelete" :loading="deleteLoading"></Button>
                    </div>
                </Dialog>
            </div>
        </NuxtLayout>

</template>