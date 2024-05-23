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

    import Calendar from 'primevue/calendar';
    
    import RadioButton from 'primevue/radiobutton';


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
    const colors = ref("White,Black");
    const sizes = ref('S,M,L');
    const flat_rate = ref(null);
    const selectedPayment = ref([]);
    const startDate = ref(null);
    const endDate = ref(null);
   
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


    const payments = ref([
        { name: 'Cash Delivery', code: 'COD', image: '/cod.jpg' },
        { name: 'Bkash Pay', code: 'bkash', image: '/bkash.jpg' },
        { name: 'Nagad Pay', code: 'nagad', image: '/nagad.png' },
        { name: 'Rocket Pay', code: 'rocket', image: '/rocket.png' },
        { name: 'Wallet Pay', code: 'wallet', image: '/wallet.jpg' },
        { name: 'Fund Pay', code: 'fund', image: '/fund.png' },
        { name: 'SSL Commerze', code: 'ssl', image: '/ssl.png' }
        
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

    const selectedShipping = ref('area');
    const shippings = ref([
        { name: 'Area Wise', key: 'area' },
        { name: 'Flat Rate', key: 'flat' },
        { name: 'Free Shipping', key: 'Free' }

    ]);

    const extraFields = ref([
        {
            fieldName: "",
            fieldValue: "",
        },
        {
            fieldName: "",
            fieldValue: "",
        }
    ]);

    // Add extra field function goes here
    const addMoreField = () => {
        extraFields.value = [
            ...extraFields.value, {
                fieldName: "",
                fieldValue: "",
            }
        ];
    }

    // Remove extra field
    const removeMoreField = (index) => {
        extraFields.value.splice(index, 1);
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
                        <div class="h-full overflow-y-auto w-full max-h-[calc(100vh-8.2rem)] flex flex-col bg-gray-100">
                            <form enctype="multipart/form-data">
                                <div class="relative flex flex-grow">
                                    <div class="w-2/12  h-full relative overflow-hidden bg-white">
                                        <div class="flex-grow w-[13.49%] z-10 cursor-pointer bg-white fixed">                                
                                            <div @click="active = 0" :class="`${active == 0 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b border-t py-1 text-left pl-3 mt-3 text-sm hover:bg-gray-100"  >Basic Information</div>
                                            <div @click="active = 1" :class="`${active == 1 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Attributes/Additional</div>
                                            <div @click="active = 2" :class="`${active == 2 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Stock Managment</div>
                                            <div @click="active = 3" :class="`${active == 3 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Galleries</div>
                                            <div @click="active = 4" :class="`${active == 4 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Shipping Information</div>
                                            <div @click="active = 5" :class="`${active == 5 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">SEO</div>
                                            <div @click="active = 6" :class="`${active == 6 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Offer</div>
                                            <div @click="active = 7" :class="`${active == 7 ? 'border-l-4 border-l-red-600 bg-gray-100' : ''}`" class="w-full border-b py-1 text-left pl-3 text-sm hover:bg-gray-100">Payment Method</div>
                                        </div>
                                    </div>
                                    <div class="w-10/12 h-full pb-8 py-2 px-6 bg-gray-100">
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
                                                        <input v-model="colors" class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="text" placeholder="Example: White,Black" />
                                                        <div class="text-[10px] text-red-400 pl-1">Color name must be comma (,) separator</div>
                                                    </div>
                                                    <div class="w-1/2">
                                                        <label for="dd-city" class="text-sm w-full">Size</label>
                                                        <input v-model="sizes" class="w-full text-sm border py-1 px-2 outline-none focus:border-green-200 rounded-md" type="text" placeholder="Example: S,M" />
                                                        <div class="text-[10px] text-red-400 pl-1">Size name must be comma (,) separator</div>
                                                    </div>
                                                </div>

                                                <div class="grid grid-col gap-2 mt-2">
                                                    <Fieldset legend="Extra Props" :pt="{
                                                        root: {
                                                            class: 'border p-2'
                                                        },
                                                        legend:{
                                                            class: 'p-0 m-0'
                                                        },
                                                        togglerIcon:{

                                                        }
                                                    }">
                                                    <template #legend>
                                                        <div class="flex align-items-center pl-2">
                                                            <div class="m-1 border rounded-md px-2 text-xs pt-2 bg-cyan-500 text-white cursor-pointer" @click="addMoreField">Add More <Icon name="mdi:table-add" width="1.4em" height="1.4em"></Icon></div>
                                                            <span class="font-bold">Extra Props</span>
                                                        </div>
                                                    </template>
                                                        
                                                        <div class="flex w-full px-2 py-1" v-for="(extra, index) in extraFields" :key="index">
                                                            
                                                            <div class="w-full mr-2">
                                                                <label for="dd-citwy" class="text-sm w-full" title="Use field name like: filedName, field_name or filedname"> Field Name <Icon name="clarity:info-solid"></Icon></label>
                                                                <input type="text" v-model="extra.fieldName"  class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Field Name"/>
                                                            </div>
                                                            <div class="w-full mr-2">
                                                                <label for="dd-citye" class="text-sm w-full"> Field Value</label>
                                                                <input type="text" v-model="extra.fieldValue" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Field Value"/>
                                                            </div>
                                                            <div class="bg-red-500 h-8 flex place-items-center p-2 rounded-md mt-[1.4rem] cursor-pointer" @click="removeMoreField(index)"><Icon class="text-white" name="humbleicons:times"></Icon></div>
                                                            
                                                        </div>


                                                    </Fieldset>
                                                    
                                                </div>

                                            </TabPanel>
                                            <!-- Additional Information -->
                                            <TabPanel>
                                                <div class="mb-2 mt-1 grid grid-cols-3 gap-2 " v-for="color in colors.split(',')" :key="color">
                                                    <ProductCard v-for="size in sizes.split(',')" :key="size" :size="size" :color="color"/>
                                                </div>
                                                
                                            </TabPanel>
                                            <!-- Stock Management -->
                                            <TabPanel>
                                                <ProductGalleries v-for="color in colors.split(',')" :key="color" :color="color"/>
                                            </TabPanel>
                                            <!-- Galleries Information -->
                                            <TabPanel>
                                                <div class="mt-1">
                                                    <div v-for="shipping in shippings" :key="shipping.key" class="flex mb-3 align-items-center">
                                                        <RadioButton v-model="selectedShipping" :inputId="shipping.key" name="dynamic" :value="shipping.key" />
                                                        <label :for="shipping.key" class="ml-2">{{ shipping.name }}</label>
                                                    </div>

                                                    <input class="py-1 px-4 rounded-md outline-none focus:border-green-200 border" v-model="flat_rate" placeholder="1.00" type="text" v-if="'flat' == selectedShipping">
                                                </div>
                                            </TabPanel>
                                            <!-- Shipping Information -->

                                            <TabPanel>
                                                <div class="mt-1 flex-col flex">
                                                    <label for="seo_meta" class="text-sm w-3/5">SEO Tag</label>
                                                    <input class="w-3/5 py-1 px-4 rounded-md outline-none focus:border-green-200 border"  placeholder="Title" type="text">
                                                    <div class="text-[10px] text-red-400 pl-1">Tag name must be comma (,) separator</div>
                                                </div>
                                                <div class="mt-3 flex-col flex">
                                                    <label for="seo_meta" class="text-sm w-3/5">SEO Short Decription</label>
                                                    <textarea rows="6" class="w-3/5 resize-none py-1 px-4 rounded-md outline-none focus:border-green-200 border" placeholder="SEO Short Decription"/>
                                                </div>
                                            </TabPanel>
                                            <!-- SEO Information -->
                                            <TabPanel>
                                                <div class="mt-1 flex-col flex">
                                                    <label for="seo_meta" class="text-sm w-3/5">Start Date</label>
                                                    <Calendar :pt="{
                                                        input: {
                                                            class: 'px-4 py-1 border'
                                                        }
                                                    }" class="w-3/5 py-1" d="calendar-24h" v-model="startDate" showTime hourFormat="24" />
                                                </div>
                                                <div class="mt-1 flex-col flex">
                                                    <label for="seo_meta" class="text-sm w-3/5">End Date</label>
                                                    <Calendar :pt="{
                                                        input: {
                                                            class: 'px-4 py-1 border'
                                                        }
                                                    }" class="w-3/5 py-1" v-model="endDate" id="calendar-24h" showTime hourFormat="24" />
                                                </div>

                                                <div class="mt-1 flex-col flex">
                                                    <label for="seo_meta" class="text-sm w-3/5">Minimum Order</label>
                                                    <input class="w-3/5 py-1 px-4 rounded-md outline-none focus:border-green-200 border"  placeholder="Minimum Number" type="number">
                                                </div>
                                                
                                            </TabPanel>
                                            <TabPanel>
                                                <ProductPay :payments="payments" />
                                            </TabPanel>
                                        </TabView>
                                        
                                    </div>

                                </div>
                                <div class="fixed bottom-9 w-[13.5%]">
                                    <button type="submit" class="rounded-bl-md bg-cyan-600 hover:font-semibold hover:bg-cyan-500 text-gray-100 hover:text-black w-full px-4 py-2">
                                        Submit <Icon name="fa6-solid:paper-plane"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                    </div> <!-- Header Div  -->

                    
                
            </div>
        </NuxtLayout>
</template>