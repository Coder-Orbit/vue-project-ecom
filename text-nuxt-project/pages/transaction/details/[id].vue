<script setup>
// replace with actual API endpoint and master key
const config = useRuntimeConfig();
const EndPoint = config.public.baseURl;
const MasterKey = config.public.masterToken;
const app_token = useTokenStore().getToken;

const transaction = ref(null)
const coreTranstion = ref(null)

const headers = ref({
    "Accept": "application/json",
    "Authorization": `Bearer ${app_token}`,
    "App-Master-Key": `${MasterKey}`
})

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
})

const loading = ref('not')
const route = useRoute();
const orderID = route.params.id;

onMounted( async () => {
    loading.value = "not";
    try {

        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/transaction?orderBy=desc&page=1&and_order_id=${orderID}`, {
        method: 'get',
        headers: headers.value,
        });
        coreTranstion.value = response.trasactions.links
        transaction.value = response.trasactions.data
        console.log(response)

    } catch (error) {
        console.log(error);
    }
    loading.value = "success";

})
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
                    <div class="font-semibold mt-1 ml-3">Transaction</div>
                    <div class="font-semibold ml-1 flex">
                        <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
                            <Icon name="gg:arrow-left-o"></Icon>
                            Back
                        </button>
                    </div>                    
                </div>
                <div class=" h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
                    <div v-for="trans in transaction" :key="trans.id">
                        <p>{{ trans.id }}</p>
                    </div>
                    <!-- {{transaction}} -->
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>