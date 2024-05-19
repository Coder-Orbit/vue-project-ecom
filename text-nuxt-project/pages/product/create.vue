<script setup>
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import TabView from 'primevue/tabview';
    import TabPanel from 'primevue/tabpanel';


    import { ref } from "vue";
    const active = ref(0);

    const items = ref([
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ]);


    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
    })

    const visibleRight = ref(false);

</script>
<template>
    <NuxtLayout :name="layout">
            <div class="w-full px-3 mt-1">

                <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                    <div class="flex w-full justify-between bg-gray-400 text-white">
                        
                        <div class="font-semibold mt-1 ml-3">Products</div>
                        <div class="font-semibold ml-1 flex">
                            <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm transition delay-100">
                                <Icon name="gg:arrow-left-o"></Icon>
                                Back
                            </button>
                        </div>
                        
                    </div>

                    <!-- Table list goes here -->
                    <div class="h-full overflow-y-auto p-3 w-full">
                        <div class="flex w-full">
                            <div class="w-2/12">
                                <Button @click="active = 0" rounded label="header one" class=" p-0" :outlined="active !== 0" />
                                <Button @click="active = 1" rounded label="2" class=" p-0" :outlined="active !== 1" />
                                <Button @click="active = 2" rounded label="3" class="p-0" :outlined="active !== 2" />
                            </div>
                            <div class="w-10/12">
                                <TabView unstyled v-model:activeIndex="active">
                                    <TabPanel >
                                        <p class="m-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                    </TabPanel>
                                </TabView>
                            </div>

                            </div>
                        
                    </div>
                    
                </div> <!-- Header Div  -->

                
            </div>
        </NuxtLayout>
</template>