<script setup>
    import Image from 'primevue/image';
    import Fieldset from 'primevue/fieldset';

    const props = defineProps({
        color: {
            type: String,
            required: true,
        },
        images: {
            type: Object,
            required: true,
        },
    });
const { colors } = props;

    const fieldestStyle = (
        { 
            root: { 
                class: 'border px-2'
            },
            legend:{
                class: 'p-0 m-0'
            }
        }
    )

    const imageStyle = (
        {
            icon: {
                class: "text-white"
            },
            toolbar: {
                class: "text-white"
            }

        }
    )


    console.table(props);

</script>

<template>

    <Fieldset legend="Extra Props" :pt="fieldestStyle">
        <template #legend>
            <div class="flex align-items-center pl-2 border-t">
                <span class="font-bold">Color: {{ color }}</span>
            </div>
        </template>
        <div class="w-full grid grid-cols-3 gap-2">
            <div class="card justify-content-center" v-for="(gallery, key) in images.color_galleries.split(',')" :key="key">
                <Image :pt="imageStyle" :src="gallery" alt="Image" preview />
            </div>
            
            
        </div>
    </Fieldset>

</template>