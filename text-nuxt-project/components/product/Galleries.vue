<script setup>
    const props = defineProps({
        color: {
            type: String,
            required: true,
        },
    });
const { color } = props;


</script>

<template>
    <div>

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
                
                <span class="font-bold">Color: {{ color }}</span>
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
    
</div>
</template>