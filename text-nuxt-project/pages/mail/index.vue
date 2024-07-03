<script setup>
    
    import { ref } from "vue";
    import Dropdown from 'primevue/dropdown';
    import FileUpload from 'primevue/fileupload';
    import Fieldset from 'primevue/fieldset';



    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
        middleware: ['auth'],
    })


    const selectedCategory = ref();
    const extraProps = ref([]);
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

    

    const dataSubmit = () => {

        extraFields.value.forEach((item, index) => {

            extraProps.value = {...extraProps.value, [item.fieldName] : item.fieldValue};
            console.log(item)
        })

        console.log(extraProps)

    }

</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">

<div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
    <div class="flex w-full justify-between  bg-gray-400 text-white">
        
        <div class="font-semibold mt-1 ml-3">Mail Configuration</div>
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
            <div class="w-1/2">
                <form  @submit.prevent="dataSubmit">
                    <div class="grid grid-cols gap-2">
                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Smtp Name</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="example: smtp.mailtrap.io"/>
                        </div>
                    </div>

                     <!-- comission tab -->
                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Smtp Mail Address</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="from address"/>
                        </div>

                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Smtp Password</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="mail password"/>
                        </div>
                        
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">From Name</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="example: Admin / Info"/>
                        </div>

                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Smtp Password</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="example: 995 / 25 / 587 / ect"/>
                        </div>
                        
                    </div>

                    <!-- comission tab -->
                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Smtp Encryption</label>
                            <input type="text" v-model="value" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="example: TLS / SSL"/>
                        </div>
                        <div class="w-full">
                            <label for="dd-city" class="text-sm w-full">Status</label>
                            <select name="status" id="commission_type" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
                                <option value="1"> Active</option>
                                <option value="0"> Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div class="place-content-end flex w-full mt-2">
                        <button class="bg-green-500 mt-1 font-semibold text-white py-1 rounded-md px-4 mb-4" type="submit">Add <Icon name="fa-solid:paper-plane"></Icon></button>
                    </div>

                    
                </form>
            </div>

        </div>
        

    </div>
    
</div>

</div>
    </NuxtLayout>
</template>