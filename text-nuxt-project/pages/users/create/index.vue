<script setup>
// replace with actual API endpoint and master key
const config = useRuntimeConfig();
const EndPoint = config.public.baseURl;
const MasterKey = config.public.masterToken;
const app_token = useTokenStore().getToken;
const loading = ref('not')

const roles = ref([]);
const selectedRoles = ref(null); // Holds the selected role ID
const country = ref([]);
const selectedCountry = ref(null); // Holds the selected role ID
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const headers = ref({
    "Accept": "application/json",
    "Authorization": `Bearer ${app_token}`,
    "App-Master-Key": `${MasterKey}`
})

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});
onMounted(async () => {
    // Fetch all roles
    await getAllRoles();
    // Fetch all countries
    await getAllCountry();
});
const getAllRoles = async () => {
    try {
        loading.value = "not";
        const response = await $fetch(`${EndPoint}/admin/${MasterKey}/roleAccess?`, {
            method: 'GET',
            headers: headers.value,
        });
        // Map API data to the required format
        roles.value = response.roles.map(b => ({
            name: b.name, // Dropdown label
            id: b.id, // Dropdown value
        }));
    } catch (error) {
        console.error('Error fetching Status:', error);
    }
    loading.value = "success";
}
const getRolesName = (id) => {
    const selected = roles.value.find(b => b.id === id);
    return selected ? selected.name : '';
};

const getAllCountry = async () => {
    try {
        loading.value = "not";
        const response = await $fetch(`${EndPoint}/countries?limit_per_page=100`, {
            method: 'GET',
            headers: headers.value,
        });
        // Map API data to the required format
        country.value = response.data.map(b => ({
            name: b.name, // Dropdown label
            id: b.id, // Dropdown value
        }));
    } catch (error) {
        console.error('Error fetching Country:', error);
    }
    loading.value = "success";
}
const getCountryName = (id) => {
    const selected = country.value.find(b => b.id === id);
    return selected ? selected.name : '';
};

const createCustomer = async () => {
    try {
        loading.value = "not";
        const response = await $fetch(`${EndPoint}/register`, {
            method: 'POST',
            headers: headers.value,
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
                role_id: selectedRoles.value,
                country_id: selectedCountry.value
            })
        });
        // console.log(response);
        router.push('/users');
    } catch (error) {
        console.error('Error fetching:', error);
    }
    loading.value = "success";
}

</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">
            <div v-if="loading !== 'success' " class="min-h-screen w-full top-0 left-0 z-30 flex items-center fixed">
                    <div class="w-12 mx-auto"><img alt="loading..." src="/spinner.gif"></div>
            </div>
            <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                <div class="flex w-full justify-between bg-gray-400 text-white">                           
                    <div class="font-semibold mt-1 ml-3">Add User</div>
                    <div class="font-semibold ml-1 flex">
                        <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm transition delay-100">
                            <Icon name="gg:arrow-left-o"></Icon>
                            Back
                        </button>
                    </div>
                </div>
                <div class="h-full overflow-y-auto w-full max-h-[calc(100vh-8.2rem)] flex flex-col bg-gray-100">
                    <form @submit.prevent="createCustomer" enctype="multipart/form-data">
                        <div class="grid grid-cols-2 gap-2 mt-4 p-4 rounded-md">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                <input v-model="name" type="text" name="name" id="name" autocomplete="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <input v-model="password" type="password" name="password" id="password" autocomplete="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input v-model="password_confirmation" type="password" name="password_confirmation" id="password_confirmation" autocomplete="password_confirmation" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                            <div class="w-6/12">
                                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                                <Dropdown v-model="selectedRoles" :options="roles" optionLabel="name" optionValue="id" filter placeholder="Select a User Type" class="w-full md:w-14rem">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div>{{ getRolesName(slotProps.value) }}</div>
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
                            <div class="w-6/12">
                                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                <Dropdown v-model="selectedCountry" :options="country" optionLabel="name" optionValue="id" filter placeholder="Select a Country" class="w-full md:w-14rem">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div>{{ getCountryName(slotProps.value) }}</div>
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
                        <div class="fixed bottom-9 w-[13.5%]">
                            <button type="submit" class="rounded-bl-md bg-cyan-600 hover:font-semibold hover:bg-cyan-500 text-gray-100 hover:text-black w-full px-4 py-2">
                                Submit <Icon name="fa6-solid:paper-plane"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>