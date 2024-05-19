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
    const jsData = '../../stores/editor'

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

                <div @keyup="getDataEditor" id="editorjs"></div>

                <!-- <editor-js v-model="dat" /> -->
                

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