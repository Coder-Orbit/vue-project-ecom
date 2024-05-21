<script setup>
    import { ref } from "vue";
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import TabView from 'primevue/tabview';
    import TabPanel from 'primevue/tabpanel';
    import Table from '@editorjs/table'
    import Header from '@editorjs/header';
    import Quote from '@editorjs/quote';

    import NestedList from '@editorjs/nested-list';

    import Embed from '@editorjs/embed';
    import Delimiter from '@editorjs/delimiter';
    import Warning from '@editorjs/warning';
    import CodeTool from '@editorjs/code';
    import RawTool from '@editorjs/raw';

    import Marker from '@editorjs/marker';
    import InlineCode from '@editorjs/inline-code';

    import IconField from 'primevue/iconfield';
    import Dropdown from 'primevue/dropdown';
    import FileUpload from 'primevue/fileupload';
    import Fieldset from 'primevue/fieldset';

    import MultiSelect from 'primevue/multiselect';
    

    const uploadEditorJS = () => import('@editorjs/editorjs')

    const Editor = ref(null)
    const oldData = ref(null)

    onMounted( async () => {
        try {
            await fetch("/api/jsonEditor")
                .then((response) => response.json())
                .then((data) => {
                    oldData.value = data;
            });
        
            const editor = await uploadEditorJS()
            Editor.value = new editor.default({
                placeholder: "write samething here...",
                holder: 'editorjs',
                data: oldData.value,
                tools: {

                    quote: Quote,
                    embed: Embed,
                    delimiter: Delimiter,
                    code: CodeTool,
                    raw: RawTool,

                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CMD+SHIFT+M',
                    },

                    Marker: {
                        class: Marker,
                        shortcut: 'CMD+SHIFT+M',
                    },

                    warning: {
                        class: Warning,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+W',
                        config: {
                            titlePlaceholder: 'Title',
                            messagePlaceholder: 'Message',
                        },
                    },

                    list: {
                        class: NestedList,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },

                    table: {
                        class: Table,
                        inlineToolbar: true,
                        Table
                    },
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    } 

                }
            })
        } catch (err) {
        console.log(err)
        }
    })

    const active = ref(0);
    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
    })
    const selectedCategory = ref();
    const selectedBrand = ref();
    const selectedVendor = ref();
    const selectedCountry = ref();
    const selectedDistrict = ref();
    const selectedPolice = ref();
    const selectedStatus = ref();
   
    const categories = ref([
        { name: 'Mobile', code: 'AU' },
        { name: 'Frez', code: 'BR' },
        { name: 'TV', code: 'CN' },
        { name: 'AC', code: 'EG' },
        { name: 'T-Shirt', code: 'FR' },
        { name: 'Pants', code: 'DE' },
        { name: 'Three PCs', code: 'IN' },
        { name: 'Shoe', code: 'JP' },
        { name: 'Panjabi', code: 'ES' },
        { name: 'Shree', code: 'US' }
    ]);

    const brands = ref([
        { name: 'Samsungs', code: 'AU' },
        { name: 'Sony', code: 'BR' }
    ]);
    const vendors = ref([
        { name: 'Smart Solutions', code: 'AU' },
        { name: 'Air Technology', code: 'BR' }
    ]);

    const countries = ref([
        { name: 'Bangladesh', code: 'AU' },
        { name: 'USA', code: 'BR' }
    ]);

    const districts = ref([
        { name: 'Dhaka', code: 'AU' },
        { name: 'Barisal', code: 'BR' }
    ]);

    const polices = ref([
        { name: 'Dhaka', code: 'AU' },
        { name: 'Barisal', code: 'BR' }
    ]);
    
    const status = ref([
        { name: 'Active', code: '1' },
        { name: 'Inactiv', code: '0' }
    ]);



    const visibleRight = ref(false);

    const getDataEditor = (data) => {
        console.table(Editor.value);
        console.table(Editor.value.render());
        Editor.value.save().then((outputData) => {
            Editor.value = outputData;

        console.log('Article data: ', outputData)
        }).catch((error) => {
        console.log('Saving failed: ', error)
});
    }
    
</script>
<template>
    <NuxtLayout :name="layout">
            <div class="w-full px-3 mt-1">

                <!-- <div @keyup="getDataEditor" id="editorjs"></div> -->
                

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
                    <div class="h-full overflow-y-auto w-full max-h-[calc(100vh-8.2rem)] flex flex-col">
                        <div class="relative flex flex-grow">
                            <div class="w-2/12 relative overflow-hidden">
                                <div class="fixed flex-grow w-[13.55%] -z-1 cursor-pointer">                                
                                    <div @click="active = 0" :class="`${active == 0 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b border-t py-1 text-left pl-3 mt-3 text-sm hover:bg-gray-100"  >Basic Information</div>
                                    <div @click="active = 1" :class="`${active == 1 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Attributes/Additional</div>
                                    <div @click="active = 2" :class="`${active == 2 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Stock Managment</div>
                                    <div @click="active = 3" :class="`${active == 3 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Galleries</div>
                                    <div @click="active = 4" :class="`${active == 4 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Shipping Information</div>
                                    <div @click="active = 5" :class="`${active == 5 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">SEO</div>
                                    <div @click="active = 6" :class="`${active == 6 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Payment Method</div>
                                </div>

                            </div>
                            <div class="w-10/12 h-full pb-8 py-2 px-4 bg-gray-100">
                                <TabView unstyled v-model:activeIndex="active">
                                    <TabPanel>
                                        <div class="w-full">
                                            <label for="dd-city" class="text-sm w-full">Product Name</label>
                                            <input class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="text" placeholder="Product Name" />
                                        </div>
                                        <div class="w-full mt-1">
                                            <div class="grid grid-cols-4 gap-2">
                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">Brand</label>
                                                    <Dropdown v-model="selectedBrand" editable :options="brands"  optionLabel="name" placeholder="Select a City" />
                                                </div>
                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">Vendor Id</label>
                                                    <Dropdown v-model="selectedVendor" editable :options="vendors"  optionLabel="name" placeholder="Select a City" />
                                                </div>
                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">Country</label>
                                                    <Dropdown v-model="selectedCountry" editable :options="countries"  optionLabel="name" placeholder="Select a City" />
                                                </div>
                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">District</label>
                                                    <Dropdown v-model="selectedDistrict" editable :options="districts"  optionLabel="name" placeholder="Select a City" />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="w-full mt-1">
                                            <div class="grid grid-cols-4 gap-2">
                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">Police Station / Thana</label>
                                                    <Dropdown v-model="selectedPolice" editable :options="polices"  optionLabel="name" placeholder="Select a City" />
                                                </div>

                                                

                                                <div class="categories">
                                                    <label for="categories" class="text-sm w-full">Category</label>
                                                    <MultiSelect :pt="{
                                                        itemCheckbox : {
                                                            class: 'shadow-md shadow-cyan-500'
                                                        }
                                                    }" v-model="selectedCategory" :options="categories" filter optionLabel="name" placeholder="Select a City" />
                                                </div>

                                                <div>
                                                    <label for="dd-city" class="text-sm w-full">Status</label>
                                                    <Dropdown v-model="selectedPolice" editable :options="polices"  optionLabel="name" placeholder="Select a City" />
                                                </div>

                                                <div class="w-full">
                                                    <label for="dd-city" class="text-sm w-full">Sequence</label>
                                                    <input class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="number" placeholder="Sequence" />
                                                </div>
                                                
                                            </div>  
                                        </div>  

                                        <div class="w-full mt-2">
                                            <label for="dd-city" class="text-sm w-full">Product Description</label>
                                            <div id="editorjs" class="w-full bg-white text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" ></div>
                                        </div>

                                        
                                            
                                        
                                    </TabPanel> 
                                    <!-- Basic Information -->
                                    <TabPanel>
                                        <div class="grid grid-rows-2 gap-2">
                                            <div class="w-1/2 pr-1">
                                                <label for="dd-city" class="text-sm w-full pl-1">Color</label>
                                                <input class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="text" placeholder="Example: White,Black" />
                                                <div class="text-[10px] text-red-400 pl-1">Color name must be comma (,) separator</div>
                                            </div>
                                            <div class="w-1/2">
                                                <label for="dd-city" class="text-sm w-full">Size</label>
                                                <input class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="text" placeholder="Example: S,M" />
                                                <div class="text-[10px] text-red-400 pl-1">Size name must be comma (,) separator</div>
                                            </div>
                                        </div>
                                        

                                    </TabPanel>
                                    <!-- Additional Information -->
                                    <TabPanel>
                                        <div class="mt-1 grid grid-cols-3 gap-2">
                                            <ProductCard/>
                                            <ProductCard/>
                                            <ProductCard/>
                                            <ProductCard/>
                                        </div>
                                        
                                    </TabPanel>
                                    <!-- Stock Management -->
                                    <TabPanel>
                                        <Fieldset legend="Extra Props" :pt="{
                                                root: {
                                                    class: 'border p-2 mb-2'
                                                },
                                                legend:{
                                                    class: 'p-0 m-0'
                                                },
                                                togglerIcon:{

                                                }
                                            }">
                                            <template #legend>
                                                <div class="flex align-items-center pl-2 border-t">
                                                    
                                                    <span class="font-bold">Color: White</span>
                                                </div>
                                            </template>
                                                
                                            <div class="flex w-full px-2 py-1">
                                                <div class="w-full mr-2">
                                                    <label for="dd-citwy" class="text-sm w-full" title="Use field name like: filedName, field_name or filedname"> Color Icon </label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                            
                                                            
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                                <div class="w-full mr-2">
                                                    <label for="dd-citye" class="text-sm w-full"> Color Thumbnails</label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                                <div class="w-full mr-2">
                                                    <label for="dd-citye" class="text-sm w-full"> Color Galleries</label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                            </div>

                                        </Fieldset>
                                        <Fieldset legend="Extra Props" :pt="{
                                                root: {
                                                    class: 'border p-2  mb-2'
                                                },
                                                legend:{
                                                    class: 'p-0 m-0'
                                                },
                                                togglerIcon:{

                                                }
                                            }">
                                            <template #legend>
                                                <div class="flex align-items-center pl-2 border-t">
                                                    
                                                    <span class="font-bold">Color: Black</span>
                                                </div>
                                            </template>
                                                
                                            <div class="flex w-full px-2 py-1">
                                                <div class="w-full mr-2">
                                                    <label for="dd-citwy" class="text-sm w-full" title="Use field name like: filedName, field_name or filedname"> Color Icon </label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                                <div class="w-full mr-2">
                                                    <label for="dd-citye" class="text-sm w-full"> Color Thumbnails</label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                                <div class="w-full mr-2">
                                                    <label for="dd-citye" class="text-sm w-full"> Color Galleries</label>
                                                    <FileUpload :pt="{
                                                            chooseButton: {
                                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                                            },
                                                        }" mode="basic" name="banner" accept="image/*" />
                                                </div>
                                            </div>

                                        </Fieldset>
                                    </TabPanel>
                                    <!-- Galleries Information -->
                                </TabView>
                                
                            </div>

                            </div>
                        
                    </div>
                    
                </div> <!-- Header Div  -->

                
            </div>
        </NuxtLayout>
</template>