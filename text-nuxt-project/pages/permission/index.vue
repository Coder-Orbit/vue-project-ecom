<script setup>
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import Sidebar from 'primevue/sidebar';


    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
        middleware: "auth",
    })

    const visibleRight = ref(false);

</script>
<template>
        <NuxtLayout :name="layout">
            <div class="w-full px-3 mt-1">

                <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                    <div class="flex w-full justify-between bg-gray-400 text-white">
                        
                        <div class="font-semibold mt-1 ml-3">Roles</div>
                        <div class="font-semibold ml-1 flex">
                            <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
                                <Icon name="gg:arrow-left-o"></Icon>
                                Back
                            </button>
                            <NuxtLink to="permission/create" class="bg-cyan-600 hover:bg-cyan-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-rt-sm">
                                <Icon name="zondicons:add-outline"></Icon>
                                Add
                            </NuxtLink>
                        </div>
                        
                    </div>

                    <!-- Table list goes here -->
                    <div class=" h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
                        <table class="table-fixed w-full">
                            <thead>
                                <tr class="w-full bg-gray-300 text-sm">
                                    <th class="p-1 text-left text-sm w-8">SL</th>
                                    <th class="p-1 text-left text-sm">Name</th>
                                    <th class="p-1 text-left">Status</th>
                                    <th class="p-1 text-left">Created Date</th>
                                    <th class="p-1 text-center w-24">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">1</td>
                                    <td class="p-1 text-left text-xs">Super Admin</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">10-05-2024 14: 20</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                    </td>
                                </tr>
                                
                                
                                
                                
                                
                                



                                
                            </tbody>
                        </table>
                    </div>
                    <div class="order_title text-sm flex justify-between h-full ">
                        <div class="mt-[2px] ml-3 ">
                            <InputGroup>
                                <input type="number" class="border border-r-0 p-1 focus:outline-none"  placeholder="Pagen Number" />
                                <icon class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer" name="nonicons:go-16" color="#000" />
                            </InputGroup>
                        </div>
                        <div class="flex -mt-1">
                            <a class="p-2 mt-1 text-black " href="#">&laquo;</a>
                            <a class="p-1 px-2 mt-1 border-t-4 border-red-500 text-red-500" href="#">1</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">2</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">3</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">4</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">5</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">...</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">6</a>
                            <a class="p-2 mt-1 text-black m-1" href="#">&raquo;</a>
                        </div>
                    </div>
                </div>

                
            </div>
        </NuxtLayout>

</template>