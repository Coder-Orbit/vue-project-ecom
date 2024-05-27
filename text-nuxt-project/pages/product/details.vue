<script setup>
    import { ref } from "vue";
    import Card from 'primevue/card';

    import TabView from 'primevue/tabview';
    import TabPanel from 'primevue/tabpanel';

    const oldData = ref([])
    const customTabStyle = ref(
        {
            headerTitle: {
                class: 'text-red-500'
            },

            headerAction:{
                class: "text-black"
            }

        }
    )
    const { data, eroor } = await useFetch('/api/jsonEditor');


    

    const additionals =  ({

                "white" : {
                    "color_icon": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_thumbnails": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_galleries": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg,https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg",
                    "size": {
                        "s": {
                            
                            "color": "black",
                            "size": "s",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 24
                        },
                        
                        "m": {
                            "product_id": 5,
                            "color": "black",
                            "size": "m",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "l": {
                            
                            "color": "black",
                            "size": "l",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "xl": {
                            
                            "color": "black",
                            "size": "xl",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "xxl": {
                            
                            "color": "black",
                            "size": "xxl",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        }
                    }
                },
                "Black" : {
                    "color_icon": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_thumbnails": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_galleries": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg,https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg",
                    "size": {
                        "s": {
                            
                            "color": "black",
                            "size": "s",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 24
                        },
                        
                        "m": {
                            "product_id": 5,
                            "color": "black",
                            "size": "m",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "l": {
                            
                            "color": "black",
                            "size": "l",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "xl": {
                            
                            "color": "black",
                            "size": "xl",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        },
                        "xxl": {
                            
                            "color": "black",
                            "size": "xxl",
                            "regular_price": 200,
                            "current_price": 150,
                            "discount": 25,
                            "dicount_type": 0,
                            "stock": 0
                        }
                    }
                },

            }
        
    )

    onMounted( async () => {
        
    })


    definePageMeta({
        layout: "dashboard",
    })

   

    
</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">
            <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                <div class="flex w-full justify-between bg-gray-400 text-white">
                    <div class="font-semibold mt-1 ml-3">Product Details</div>
                    <div class="font-semibold ml-1 flex">
                        <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm transition delay-100">
                            <Icon name="gg:arrow-left-o"></Icon>
                            Back
                        </button>
                    </div>                    
                </div>


                <div class="h-full overflow-y-auto p-4 w-full max-h-[calc(100vh-8.2rem)] flex flex-col bg-gray-100">
                    
                    <div class="grid grid-cols-4 gap-2">
                        <div v-for="(additional, key, indexKey) in additionals" :key="indexKey">
                            <ProductGallery :images="additional" :color="key"/>
                        </div>
                    </div>

                    <div class="w-full mt-3">
                        <div class="w-full" v-for="(color, key, indexKey) in additionals" :key="indexKey">
                            <ProductSizes :sizes="color.size" :color="key" />
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-2 mt-3 ">
                        <div class="w-full border rounded-md p-2 bg-white">
                            <div class="w-full text-sm"><b>Vendor:</b> Cusotm Vendor Name</div>
                            <div class="w-full text-sm"><b>Total Sale:</b> 11</div>
                            <div class="w-full text-sm"><b>Total Return:</b> 1</div>
                            <div class="w-full text-sm"><b>Ratting:</b> 4.1 <Icon name="noto:star"/></div>
                        </div>
                        <div class="w-full border rounded-md p-2">
                            <div class="w-full text-sm"><b>Categories:</b> Category1, Category2, Category3</div>
                        </div>
                        <div class="w-full border rounded-md p-2">
                            <div class="w-full text-sm"><b>Brand:</b> Brand Name</div>
                        </div>
                        <div class="w-full border rounded-md p-2">
                            <div class="w-full text-sm"><b>Countries:</b> Bangladesh</div>
                            <div class="w-full text-sm"><b>District:</b> Dhaka</div>
                            <div class="w-full text-sm"><b>Thana/Police:</b> Mirpur</div>
                        </div>
                    </div>

                    <!-- Tab start -->
                    <div class="w-full mt-4">
                        <div class="card">
                            <TabView >
                                <TabPanel header="Details" :pt="customTabStyle">

                                    {{ data.blocks }}

                                    <div class="w-full" v-for="(item, label, indexKey) in data.blocks" :key="indexKey">
                                        <div v-if="item.type == 'header' && item.data.level == '1'">
                                            <h1 class="font-bold text-xl">{{ item.data.text }} </h1>
                                        </div>
                                        <div v-else-if="item.type == 'header' && item.data.level == '2'">
                                            <h2 class="font-bold text-lg">{{ item.data.text }} </h2>
                                        </div>
                                        <div v-else-if="item.type == 'header' && item.data.level == '3'">
                                            <h3 class="font-bold text-md">{{ item.data.text }} </h3>
                                        </div>
                                        <div v-else-if="item.type == 'header' && item.data.level == '4'">
                                            <h4 class="font-bold text-sm">{{ item.data.text }} </h4>
                                        </div>
                                        <div v-else-if="item.type == 'header' && item.data.level == '5'">
                                            <h5 class="font-bold text-xs">{{ item.data.text }} </h5>
                                        </div>
                                        <div v-else-if="item.type == 'header' && item.data.level == '6'">
                                            <h6 class="font-semibold text-xs">{{ item.data.text }} </h6>
                                        </div>

                                        <p class="mb-3" v-else-if="item.type == 'paragraph'" v-html="item.data.text"></p>

                                        <ol class="mb-3 list-decimal pl-6" v-else-if="item.type == 'list' && item.data.style == 'ordered'">
                                            <li class="mb-1" v-for="(list, index) in item.data.items" :key="index">
                                                {{ list }}
                                            </li>
                                        </ol>

                                        <ul class="mb-3 list-disc pl-6" v-else-if="item.type == 'list' && item.data.style == 'unordered'">
                                            <li class="mb-1" v-for="(list, index) in item.data.items" :key="index">
                                                {{ list }}
                                            </li>
                                        </ul>

                                        <table class="mb-3 list-disc pl-6 table w-full table-auto border-collapse border border-slate-400" v-else-if="item.type == 'table'">
                                            <tr class="mb-1" v-for="(contents, index) in item.data.content" :key="index">
                                                <td class="border border-slate-300 py-1 px-3" v-for="(content, index) in contents" :key="index">{{ content }}</td>
                                            </tr>
                                        </table>
                                        
                                        <iframe v-if="item.type == 'Embed'" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" frameborder="0" :width="item.data.width" :height="item.data.height" :src="item.data.embed"></iframe>
                                       
                                    </div>
                                    
                                </TabPanel>
                                <TabPanel header="Feedback" :pt="customTabStyle">
                                    <p class="m-0">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                    </p>
                                </TabPanel>
                                
                            </TabView>
                        </div>
                    </div>

                </div>


                

            </div>
        </div>
    </NuxtLayout>
</template>