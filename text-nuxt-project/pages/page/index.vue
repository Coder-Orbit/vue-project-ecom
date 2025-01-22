<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Sidebar from "primevue/sidebar";
import TabMenu from "primevue/tabmenu";
import Calendar from "primevue/calendar";

import Dropdown from "primevue/dropdown";


import { ref } from "vue";

// replace with actual API endpoint and master key
const config = useRuntimeConfig();
const EndPoint = config.public.baseURl;
const MasterKey = config.public.masterToken;
const app_token = useTokenStore().getToken;

const loading = ref('not')
const products = ref([])
const pageNumber = ref(1)
const visibleRight = ref(false);

const headers = ref({
    "Accept": "application/json",
    "Authorization": `Bearer ${app_token}`,
    "App-Master-Key": `${MasterKey}`
})

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});

onMounted(async () => {

   getAllData();

})

// get all value 
const getAllData = async()=>{
    try {
        products.value = await $fetch(`${EndPoint}/admin/${MasterKey}/page?orderBy=desc&limit_per_page=10`,
            {
                method: 'get',
                headers: headers.value,
            }
        )

        loading.value = "success";
        console.log(products.value);


    } catch (err) {
        console.log(err)
    }
}


const paginate = async (page) => {
    loading.value = "not";
    pageNumber.value = page;

    if (page == "&laquo; Previous") {

        pageNumber.value = ((products.value.current_page - 1) == 0 ? 1 : (products.value.current_page - 1));

    } else if (page == 'Next &raquo;') {

        pageNumber.value = ((products.value.current_page + 1) == products.value.last_page ? products.value.last_page : (products.value.current_page + 1));

    }

    try {

        products.value = await $fetch(`${EndPoint}/admin/${MasterKey}/page?orderBy=desc&limit_per_page=10&page=${pageNumber.value}`,
            {
                method: 'get',
                headers: headers.value,
            }
        );
    }

    catch (error) {
        console.log(error);
    }

    loading.value = "success";
}


//Delete Handler

const deleteHandler = async (id) => {
    console.log('delete id', id)
    try {
        const res = await $fetch(`${EndPoint}/admin/${MasterKey}/page/${id}`, {
            method: 'DELETE',
            headers: headers.value,

        })

        if(res){
            getAllData();
        }

    } catch (err) {
        console.log(err)
    }

}




</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">
            <!-- <div v-if="loading !== 'success'" class="min-h-screen w-full top-0 left-0 z-30 flex items-center fixed">
                <div class="w-12 mx-auto">
                    <img alt="loading..." src="/spinner.gif" />
                </div>
            </div> -->
            <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                <div class="flex w-full justify-between bg-gray-400 text-white">
                    <div class="font-semibold mt-1 ml-3">Page List</div>
                    <div class="font-semibold ml-1 flex">
                        <button @click="$router.back()"
                            class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
                            <Icon name="gg:arrow-left-o"></Icon>
                            Back
                        </button>

                        <button
                            class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm"
                            @click="visibleRight = true">
                            <Icon name="iconoir:filter-solid"></Icon>
                            Filter
                        </button>
                        <NuxtLink to="product/create"
                            class="bg-cyan-600 hover:bg-cyan-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-rt-sm">
                            <Icon name="zondicons:add-outline"></Icon>
                            Add
                        </NuxtLink>
                    </div>
                </div>

                <!-- Table list goes here -->
                <div class="h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
                    <table class="w-full table-auto">
                        <thead>
                            <tr class="w-full bg-gray-300 text-sm">
                                <th class="p-1 text-left text-sm w-8">SL</th>
                                <th class="p-1 text-left text-sm">Name</th>
                                <th class="p-1 text-left text-sm">Field_Name</th>
                                <th class="p-1 text-left text-sm">Field_Value</th>
                                <th class="p-1 text-left text-sm">Layout</th>
                                <th class="p-1 text-left">Status</th>
                                <th class="p-1 text-center w-24">...</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in products?.data" class="bg-white odd:bg-gray-100"
                                :key="product.id">
                                <!-- Maintain for serial key -->
                                <td class="p-1 text-center text-xs">
                                    {{ index }}
                                </td>

                                <td class="p-1 text-left text-xs">
                                    <p class="w-72">{{ product.name }}</p>
                                </td>

                                <td class="p-1 text-left text-xs">
                                    <div v-for="(item, index) in product?.extend_props" :key="index" class="flex gap-2">
                                       
                                       
                                        <span>
                                            {{ item?.field_name }}

                                        </span>
                                    </div>

                                </td>
                                <td class="p-1 text-left text-xs">
                                    <div v-for="(item, index) in product?.extend_props" :key="index" class="flex gap-2">
                                        <span>
                                            {{ item?.value }}

                                        </span>
                                    </div>

                                </td>
                                <!-- <td class="p-1 text-left text-xs">
                                    <span v-for="(items, index) in product?.extend_props" :key="index">
                                        {{ items?.field_name }}

                                    </span>
                                </td> -->


                                <td class="p-1 text-xs">
                                    {{ product.layout }}
                                </td>
                                <td class="p-1 text-xs">
                                    {{ product.status }}
                                </td>

                                <td class="p-1 text-center text-xs flex">
                                    <!-- <div
                                        class="rounded-s-sm bg-blue-600 px-2 py-1 mt-1 text-white"
                                        title="Additional Product"
                                    >
                                        <NuxtLink
                                            :to="`/product/additional/${product.id}`"
                                        >
                                            <Icon
                                                name="fa6-solid:clone"
                                                width="1em"
                                                height="1em"
                                            />
                                        </NuxtLink>
                                    </div> -->

                                    <!-- <NuxtLink
                                        class="bg-cyan-400 px-2 py-1 mt-1 text-white"
                                        title="View"
                                        :to="`/product/details/${product.id}`"
                                    >
                                        <Icon
                                            name="mdi:eye"
                                            width="1em"
                                            height="1em"
                                        />
                                    </NuxtLink>

                                    <NuxtLink
                                        class="bg-green-600 px-2 py-1 mt-1 text-white"
                                        title="View"
                                        :to="`/product/medias/${product.id}`"
                                    >
                                        <Icon
                                            name="ic:sharp-perm-media"
                                            width="1em"
                                            height="1em"
                                        />
                                    </NuxtLink> -->

                                    <NuxtLink :to="`/page/${product.id}`"
                                        class="bg-yellow-500 px-2 py-1 mt-1 text-white" title="Edit">
                                        <Icon name="subway:pencil" width="1em" height="1em" />
                                    </NuxtLink>
                                    <div @click="deleteHandler(product.id)"
                                        class="rounded-s-sm bg-blue-600 px-2 py-1 mt-1 text-white cursor-pointer hover:text-[red]">

                                        <Icon name="streamline:recycle-bin-2" width="1em" height="1em" />

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="order_title text-sm flex justify-between h-full">
                    <div class="mt-[2px] ml-3">
                        <InputGroup>
                            <input type="number" v-model="pageNumber" class="border border-r-0 p-1 focus:outline-none"
                                placeholder="Pagen Number" />
                            <icon class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer"
                                @click="paginate(pageNumber)" name="nonicons:go-16" color="#000" />
                        </InputGroup>
                    </div>
                    <div class="flex -mt-1 h-dvh">
                        <a v-for="(page, index) in products?.links" :key="index" @click="paginate(page.label)"
                            v-html="page.label" :class="{ 'border-t-4 px-2 border-red-500 text-red-500': page.active }"
                            class="px-2 pt-2 mt-1 block text-black" href="#" />
                    </div>
                </div>
            </div>


        </div>
    </NuxtLayout>
</template>

<style scoped>
span.p-dropdown-label.p-inputtext.p-placeholder {
    padding: 2px;
}
</style>