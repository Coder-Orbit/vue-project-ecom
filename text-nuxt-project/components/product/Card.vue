<script setup>
    import Card from 'primevue/card';
    const props = defineProps({
        color: {
            type: String,
            required: true,
        },
        
        size: {
            type: String,
            required: true,
        },
    });

    const { color, size } = props;

</script>
<template>
    <Card class="w-full rounded-md overflow-hidden product_stock">
        <template #header>
            <div class=" bg-gray-300 p-1 text-center text-black font-semibold">Stock: {{ color }} | {{ size }}</div>
        </template>
        <template #content >

                <div class="w-full flex mb-1">
                    <label for="dd-city" class="text-xs w-2/5">Regular Price:</label>
                    <input type="number" v-model="value" class="w-3/5 text-xs border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Regular Price"/>
                </div>

                <div class="w-full flex mb-1">
                    <label for="dd-city" class="text-xs w-2/5">Current Price:</label>
                    <input type="number" v-model="value" class="w-3/5 text-xs border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Current Price"/>
                </div>

                <div class="w-full flex mb-1">
                    <label for="dd-city" class="text-xs w-2/5">Discount:</label>
                    <input type="number" v-model="value" class="w-3/5 text-xs border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Discount"/>
                </div>

                <div class="w-full flex mb-1">
                    
                           
                    <label for="dd-city" class="text-xs w-2/5">Discount Type:</label>
                    <select name="discount_type" id="discount_type" class="w-3/5 text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
                        <option value="fixed"> Fixed</option>
                        <option value="parcentage"> Parcentage</option>
                    </select>
                    
                </div>

                <div class="w-full flex mb-1">
                    <label for="dd-city" class="text-xs w-2/5">Stock:</label>
                    <input type="number" v-model="value" class="w-3/5 text-xs border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Stock"/>
                </div>
        </template>
    </Card>
</template>