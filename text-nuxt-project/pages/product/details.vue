<script setup>
    import { ref } from "vue";
    import Card from 'primevue/card';

    const additionals =  ({

        

                "white" : {
                    "color_icon": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_thumbnails": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_galleries": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg,https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg",
                },
                "Black" : {
                    "color_icon": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_thumbnails": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
                    "color_galleries": "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg,https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg",
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
                    
                    
                            <!-- <div class="card flex justify-content-center">
                                    <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="250" preview />
                                </div>
                            <Card>
                                
                                <template #title>Simple Card</template>
                                <template #content>
                                    <p class="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                                        quas!
                                    </p>
                                </template>
                            </Card> -->
                        </div>
                        
                    </div> <!-- Header Div  -->

                    
                
            </div>
    </NuxtLayout>
</template>