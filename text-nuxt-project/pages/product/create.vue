<script setup>
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
                            <div class="w-2/12 border-r relative overflow-hidden">
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
                            <div class="w-10/12 h-full pb-8 py-2 pl-4">
                                <TabView unstyled v-model:activeIndex="active">
                                    <TabPanel>dsfasdf</TabPanel>
                                    <TabPanel>Div</TabPanel>
                                    <TabPanel>Tab 3</TabPanel>
                                </TabView>
                                
                            </div>

                            </div>
                        
                    </div>
                    
                </div> <!-- Header Div  -->

                
            </div>
        </NuxtLayout>
</template>