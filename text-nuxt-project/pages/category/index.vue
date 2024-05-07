<script setup lang="ts">
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';

    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
    })

</script>
<template>
        <NuxtLayout :name="layout">
            <div class="w-full px-3 mt-1">

                <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                    <div class="flex w-full justify-between bg-opacity-20 bg-red-600">
                        
                        <div class="font-semibold mt-1 ml-3">Category</div>
                        <div class="font-semibold mt-1 ml-1 flex">
                            <button @click="$router.back()" class="bg-gray-600 hover:bg-gray-500 text-gray-100 hover:text-black px-2 py-1 text-sm rounded-md transition delay-100">
                                <i class="fa-regular fa-arrow-left mr-1"></i>
                                Back
                            </button>

                            <button class="bg-gray-600 hover:bg-gray-500 text-gray-100 transform  hover:text-black mx-2 px-2 py-1 text-sm rounded-md">
                                <i class="fa-regular fa-filter mr-1"></i>
                                Filter
                            </button>
                            <NuxtLink to="brand/add" class="bg-gray-600 hover:bg-gray-500 text-gray-100 hover:text-black px-2 py-1 text-sm rounded-md">
                                <i class="fa-regular fa-plus mr-1"></i>
                                Add
                            </NuxtLink>
                        </div>
                        
                    </div>

                    <!-- Table list goes here -->
                    <div class=" h-[calc(100vh-10.4rem)] overflow-y-auto border-b p-3">
                        <table class="table-fixed w-full">
                            <thead>
                                <tr class="w-full bg-gray-300 text-sm">
                                    <th class="p-1 text-left text-sm w-8">SL</th>
                                    <th class="p-1 text-left text-sm w-12">Icon</th>
                                    <th class="p-1 text-left text-sm">Comission</th>
                                    <th class="p-1 text-left text-sm">Category</th>
                                    <th class="p-1 text-left text-sm">Sub Category</th>
                                    <th class="p-1 text-left text-sm w-48">Description</th>
                                    <th class="p-1 text-left">Status</th>
                                    <th class="p-1 text-left">Created Date</th>
                                    <th class="p-1 text-center">Created By</th>
                                    <th class="p-1 text-center w-24">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">1</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>

                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">2</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">3</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">4</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">5</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">6</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">7</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">8</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">9</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">10</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">11</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">12</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                <tr class="bg-white odd:bg-gray-100">
                                    <td class="p-1 text-center text-xs">13</td>
                                    <td class="p-1 text-left text-xs"></td>
                                    <td class="p-1 text-left text-xs">10%</td>
                                    <td class="p-1 text-left text-xs">Mobile</td>
                                    <td class="p-1 text-left text-xs">-</td>
                                    <td class="p-1 text-left text-xs">Description</td>
                                    <td class="p-1 text-left text-xs">Active</td>
                                    <td class="p-1 text-left text-xs">30-11-2023 10:30</td>
                                    <td class="p-1 text-center text-xs">admin</td>
                                    <td class="p-1 text-center text-xs flex">
                                        <div class=" rounded-md bg-cyan-400 p-1 text-white" title="View"><Icon name="mdi:eye" width="1.4em" height="1.4em"/></div>
                                        <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit"><Icon name="subway:pencil" width="1.4em" height="1.4em" /></div>
                                        <button class="rounded-md bg-red-600 p-1 text-white" title="Delete"><Icon name="bxs:trash" width="1.4em" height="1.4em" /></button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="order_title text-sm flex justify-between h-full ">
                        <div class="mt-1 ml-3 ">
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