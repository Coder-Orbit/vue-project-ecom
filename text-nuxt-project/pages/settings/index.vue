<script setup>
    
    import { ref } from "vue";
    import Dropdown from 'primevue/dropdown';
    import FileUpload from 'primevue/fileupload';
    import Fieldset from 'primevue/fieldset';



    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
    })


    const extraProps = ref({
        field_name: "",
        field_value: "",
        field_group: ""
    });

    const extraFields = ref([
        {
            fieldName: "",
            fieldValue: "",
            fieldGroup: "",
        },
        {
            fieldName: "",
            fieldValue: "",
            fieldGroup: "",
        }
    ]);

    // Add extra field function goes here
    const addMoreField = () => {
        extraFields.value = [
            ...extraFields.value, {
                fieldName: "",
                fieldValue: "",
                fieldGroup: "",
            }
        ];
    }

    // Remove extra field
    const removeMoreField = (index) => {
        extraFields.value.splice(index, 1);
    }

    


    const dataSubmit = () => {

        extraFields.value.forEach((field, index) => ({

            ...extraProps.value.field_name = [
                ...extraProps.value.field_name,
                field.fieldName
            ],

            ...extraProps.value.field_value = [
                ...extraProps.value.field_value,
                field.fieldValue
            ],

            ...extraProps.value.field_group = [
                ...extraProps.value.field_group,
                field.fieldGroup
            ]

            

        }))

        // for (let i = 0; i < extraFields.value.length; i++) {
        //     extraProps.value = [
        //         {
        //             [i] : i, ...extraProps.value[i]
        //         }
                
        //     ]
        // }


        console.log(extraProps);

    }

</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">

<div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
    <div class="flex w-full justify-between  bg-gray-400 text-white">
        
        <div class="font-semibold mt-1 ml-3">Create Brand</div>
        <div class="font-semibold ml-1 flex">
            <button @click="$router.back()" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-tr-sm">
                <Icon name="gg:arrow-left-o"></Icon>
                Back
            </button>
        </div>
        
    </div>
    <!-- Body Content goes here -->
    <div class=" h-[calc(100vh-8rem)] overflow-y-auto border-b px-3 pt-2">
        <div class="flex w-full justify-center">
            <div class="w-2/3">
                <form  @submit.prevent="dataSubmit">
                    <!-- dynamic field -->
                   
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
                                
                                <div class="w-full mr-2">
                                    <label for="dd-citye" class="text-sm w-full"> Field Group</label>
                                    <input type="text" v-model="extra.fieldGroup" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Field Group"/>
                                </div>
                                
                                <div class="bg-red-500 h-8 flex place-items-center p-2 rounded-md mt-[1.4rem] cursor-pointer" @click="removeMoreField(index)"><Icon class="text-white" name="humbleicons:times"></Icon></div>
                                
                            </div>


                        </Fieldset>
                        
                    </div>


                    <div class="place-content-end flex w-full mt-1">
                        <button class="bg-green-500 mt-1 font-semibold text-white py-1 rounded-md px-4 mb-4" type="submit">Add <Icon name="fa-solid:paper-plane"></Icon></button>
                    </div>

                    
                </form>
                <a target="_blank" class="text-xs text-red-500" href="https://www.base64-image.de/">Convert Image into base64</a>
            </div>
            

        </div>
        

    </div>
    
</div>

</div>
    </NuxtLayout>
</template>