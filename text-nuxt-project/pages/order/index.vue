<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Sidebar from "primevue/sidebar";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const searchQuery = ref('');
const startDate = ref(null);
const endDate = ref(null);
const totalOrders = ref(0);
const statusValue = ref("")
const isDropdownVisible = ref(false);
const idChecker = ref(null);
const currentOrderID = ref(null);
const deleteModalVisible = ref(false);
const deleteLoading = ref(false);
const pageNumber = ref(1)
const orders = ref([]);
const visibleRight = ref(false);
const status = ref([]); // Holds the dropdown options
const selectedStatus = ref(null); // Holds the selected staus ID
const vendor = ref([]); // Holds the dropdown options
const selectedVendor = ref(null); // Holds the selected vendor ID

// replace with actual API endpoint and master key
const config = useRuntimeConfig();
const EndPoint = config.public.baseURl;
const MasterKey = config.public.masterToken;
const app_token = useTokenStore().getToken;
const loading = ref('not')


const headers = ref({
    "Accept": "application/json",
    "Authorization": `Bearer ${app_token}`,
    "App-Master-Key": `${MasterKey}`
})

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

const coreofOrders = ref([])
onMounted(async () => {
  try {
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/orders?orderBy=desc&page=1`, {
        method: 'get',
        headers: headers.value,
        });
        coreofOrders.value = response.orders;
        // console.log(response.orders);
        orders.value = response.orders.data;
        loading.value = "success";
        // console.table(orders.value);
    } catch (err) {
    console.log(err);
  }
});

const paginate = async (page) => {
    loading.value = "not";

    if (page === "&laquo; Previous") {
        pageNumber.value = coreofOrders.value.current_page;
    } else if (page === "Next &raquo;") {
        pageNumber.value = coreofOrders.value.current_page + 1;
    } else {
        pageNumber.value = page;
    }

    try {
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/orders?page=${pageNumber.value}`, {
            method: 'get',
            headers: headers.value,
        });
        orders.value = response;
        // console.log("Response PAge:",response);
        orders.value = response.orders.data;
    } catch (error) {
        console.log(error);
    }

    loading.value = "success";
}


onMounted(async () => {
    try {
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/status?`, {
            method: 'GET',
            headers: headers.value,
        });
        // Map API data to the required format
        status.value = response.data.map(b => ({
            name: b.name, // Dropdown label
            id: b.id, // Dropdown value
        }));
            // console.log('Status:', status.value);
    } catch (error) {
        console.error('Error fetching Status:', error);
    }
});
        
// Utility function to get the name of the selected status
const getStatusName = (id) => {
    const selected = status.value.find(b => b.id === id);
    return selected ? selected.name : '';
};

onMounted(async () => {
    try {
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/vendor?`, {
            method: 'GET',
            headers: headers.value,
        });
        // Map API data to the required format
        vendor.value = response.data.map(b => ({
            name: b.name, // Dropdown label
            id: b.id, // Dropdown value
        }));
        //console.log('Vendor:', vendor.value);
    } catch (error) {
        console.error('Error fetching vendor:', error);
    }
});

        // Utility function to get the name of the selected vendor
const getVendorName = (id) => {
    const selected = vendor.value.find(b => b.id === id);
    return selected ? selected.name : '';
};

// Implemented the search functionality


const fetchFilteredProducts = async () => {
    loading.value = "not";
    try {
        const stDateParams = startDate.value ? startDate.value.toISOString().split('T')[0] : '';
        const enDateParams = endDate.value ? endDate.value.toISOString().split('T')[0] : '';
        
        // Create the parameters object and remove any null, undefined, or empty values
        const params = {
            name: searchQuery.value || undefined,
            status: selectedStatus.value || undefined,
            vendor_id: selectedVendor.value || undefined,
            from_date: stDateParams || undefined,
            to_date: enDateParams || undefined,
        };

        // Remove keys with undefined values
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== undefined)
        );

        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/orders`, {
            method: 'get',
            headers: headers.value,
            params: filteredParams,
        });

        orders.value = response.orders?.data || [];
        totalOrders.value = orders.value.length;
        loading.value = "success";
    } catch (error) {
        console.log(error);
        loading.value = "error";
    }
};



const toggleDropdown = (orderID) => {
  idChecker.value = orderID;
  console.log(idChecker.value);
  isDropdownVisible.value = isDropdownVisible.value === orderID ? null : orderID;
};

const updateStatus = async () => {
  loading.value = "not";
  try {
        deleteLoading.value = true;
        isDropdownVisible.value = false;
        // selectedStatus.value = id;
        // currentOrderID.value = orderID;
        // Perform the API call to update the status
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/order_status`,
        {
            method: "POST",
            headers: headers.value,
            body: JSON.stringify({ confirm_id: selectedStatus.value, order_id: currentOrderID.value }),
        }
        );
        console.log(status.value)
        console.log("Status updated successfully:", response);
        deleteLoading.value = false;
        deleteModalVisible.value = false;
        loading.value = "success";

    } catch (error) {
    console.error("Error updating Status:", error);
    }
};

// Open the confirm modal for the specific slide
const openDeleteModal = (id, orderID) => {
    selectedStatus.value = id;
    currentOrderID.value = orderID;
    // deleteModalVisible.value = true;
    deleteModalVisible.value = deleteModalVisible.value === null ? orderID : orderID;
};


const testFunc = () => {
    statusValue.value = `

            ${status.value.map((option) => `
            <ul class="py-2 text-xs text-gray-700 dark:text-gray-200">
                <li class="cursor-pointer">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${option.name}</a>
                </li>
            </ul>`).join("")}
            `;
    console.log(statusValue.value);
};

</script>
<template>
  <NuxtLayout :name="layout">
    <div class="w-full px-3 mt-1">
            <div v-if="loading !== 'success'" class="min-h-screen w-full top-0 left-0 z-30 flex items-center fixed">
                <div class="w-12 mx-auto">
                    <img alt="loading..." src="/spinner.gif" />
                </div>
            </div>
            <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
            <div class="flex w-full justify-between bg-gray-400 text-white">
                <div class="font-semibold mt-1 ml-3">All Orders</div>
                <div class="font-semibold ml-1 flex">
                    <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
                        <Icon name="gg:arrow-left-o"></Icon> Back
                    </button>
                    <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black text-sm px-4 py-2" @click="visibleRight = true">
                        <Icon name="iconoir:filter-solid"></Icon> Filter
                    </button>
                </div>
            </div>
            <!-- Table list goes here -->
            <div class="h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
                <table class="w-full table-auto">
                    <thead>
                        <tr class="w-full bg-gray-300 text-sm">
                            <th class="p-1 text-left text-sm w-8 pl-6">SL</th>
                            <th class="p-1 text-left text-sm">Order Id</th>
                            <th class="p-1 text-left text-sm">Name</th>
                            <th class="p-1 text-left text-sm">Contact No</th>
                            <th class="p-1 text-left text-sm">Items</th>
                            <th class="p-1 text-left text-sm">Amount</th>
                            <th class="p-1 text-left text-sm">Discount</th>
                            <th class="p-1 text-left text-sm">Total</th>
                            <th class="p-1 text-left text-sm">Advance</th>
                            <th class="p-1 text-left text-sm">Due</th>
                            <th class="p-1 text-left text-sm">Status</th>
                            <th class="p-1 text-center text-sm">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order) in orders" class="bg-white odd:bg-gray-100" :key="order.id">
                            <td class="p-1 text-left text-xs pl-6"> {{ order.id }} </td>
                            <td class="p-1 text-left text-xs">{{ order.unique_id }}</td>
                            <td class="p-1 text-left text-xs">{{ order.extend_props.contact.name }}</td>
                            <td class="p-1 text-left text-xs">{{ order.extend_props.contact.mobile }}</td>
                            <td class="p-1 text-left text-xs">
                                <ol class="list-decimal pl-5">
                                    <li v-for="item in order.order_items" :key="item.id">{{ item.item_name.length > 20 ? item.item_name.substring(0, 20) + '...' : item.item_name }}</li>
                                </ol>
                            </td>
                            <td class="p-1 text-left text-xs">{{ order.total }}</td>
                            <td class="p-1 text-left text-xs">{{ order.discount }}</td>
                            <td class="p-1 text-left text-xs">{{ order.total }}</td>
                            <td class="p-1 text-left text-xs">{{ order.advance }}</td>
                            <td class="p-1 text-left text-xs">{{ order.due }}</td>
                            <td class="p-1">
                                <!-- Button to toggle dropdown -->
                                <button @click="testFunc" class="text-dark rounded-lg text-xs px-2 py-1 text-left inline-flex items-center" type="button">
                                    {{ order.status.name }} <Icon name="material-symbols-light:keyboard-arrow-down-rounded" width="2em" height="2em"/>
                                </button>
                                <!-- Dropdown menu -->
                                <div v-html="statusValue" class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"/>
                            </td>
                            <td class="p-1 text-xs grid text-center justify-items-center">
                                <div class="flex">
                                    <NuxtLink class="bg-cyan-400 p-1 text-white rounded" :to="`/order/details/${order.unique_id}`">
                                        <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                                    </NuxtLink>
                                    <NuxtLink class="p-1 text-white rounded bg-red-500 ml-1" :to="`/order/print/${order.unique_id}`">
                                        <Icon name="material-symbols:print-rounded" width="1.4em" height="1.4em" />
                                    </NuxtLink>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="order_title text-sm flex justify-between h-full">
                <div class="mt-[2px] ml-3">
                    <InputGroup>
                        <input type="number" v-model="pageNumber" class="border border-r-0 p-1 focus:outline-none" placeholder="Page Number" />
                        <Icon class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer" @click="paginate(pageNumber)" name="nonicons:go-16" color="#000" />
                    </InputGroup>
                </div>
                <div class="flex -mt-1 h-dvh">
                <a v-for="(page, index) in coreofOrders?.links" :key="index" @click="paginate(page.label)" v-html="page.label" :class="{'border-t-4 px-2 border-red-500 text-red-500': page.active}" class="px-2 pt-2 mt-1 block text-black" href="#" />
                </div>
            </div>
            </div>
            <Sidebar v-model:visible="visibleRight" header="Transaction Filter" position="right">
            <div class="w-full">
                <label for="dd-city" class="text-sm w-full">Name</label>
                <input type="text" v-model="searchQuery" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Enter Name" />
            </div>
            <!-- Date Range-->
            <div class="w-full mt-2">
                <label for="dd-city" class="text-sm w-full">Date Range</label>
                <div>
                    <Calendar :pt="{input: {class: 'px-4 py-1 border',},}" class="w-[48%] mr-1 text-sm outline-none focus:border-red-200 rounded-md" v-model="startDate" placeholder="Start Date" />
                    <Calendar :pt="{input: {class: 'px-4 py-1 border',},}" class="w-1/2 text-sm outline-none focus:border-red-200 rounded-md" v-model="endDate" placeholder="End Date" />
                </div>
            </div>
            
            <!-- Status & Vendor-->
                <div class="w-full grid grid-cols-2 gap-2 mt-2">
                <div>
                    <label for="dd-city" class="text-sm w-full">Status</label>
                    <Dropdown v-model="selectedStatus" :options="status" optionLabel="name" optionValue="id" filter placeholder="Select a Status" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ getStatusName(slotProps.value) }}</div>
                            </div>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div>
                    <label for="dd-city" class="text-sm w-full">Vendor</label>
                    <Dropdown v-model="selectedVendor" :options="vendor" optionLabel="name" optionValue="id" filter placeholder="Select a Vendor" class="w-full md:w-14rem">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center">
                            <div>{{ getVendorName(slotProps.value) }}</div>
                        </div>
                        <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                    </Dropdown>
                </div>
                </div>
                <div class="font-semibold flex mt-2 place-content-end">
                    <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm rounded-md" @click="fetchFilteredProducts">
                        <Icon name="fluent:search-12-filled"></Icon> Search
                    </button>
                </div>

                <div class="mt-2 text-sm text-gray-600">
                    <span v-if="totalOrders">Showing {{ totalOrders }} results</span>
                    <span v-else>No results found</span>
                </div>
        </Sidebar>

        <Dialog v-model:visible="deleteModalVisible" modal header="Delete Slide" :style="{ width: '25rem' }">
            <span class="p-text-secondary flex items-center justify-center flex-col mb-5">
                <Icon name="material-symbols:delete-sweep-rounded" width="120px" height="120px" class="mr-2 text-red-500" /> Are you sure you want to delete this slide?
            </span>
            <div class="flex justify-around">
                <Button class="bg-yellow-600 text-red-100 px-4 py-2" type="button" label="Cancel" severity="secondary" @click="deleteModalVisible = false"></Button>
                <Button class="bg-red-600 text-red-100 px-4 py-2" type="button" label="Delete" @click="updateStatus" :loading="deleteLoading"></Button>
            </div>
        </Dialog>

    </div>
  </NuxtLayout>
</template>


<style>
span.p-dropdown-label.p-inputtext.p-placeholder {
  padding: 0px;
  margin: 0px;
}
span.p-dropdown-label.p-inputtext {
  padding: 0px;
  font-size: 15px;
  font-weight: 500;
  color: #767676d1;
}
</style>
