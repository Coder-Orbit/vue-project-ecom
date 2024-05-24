<script setup>
const props = defineProps({
    color: {
        type: String,
        required: true,
    },
    sizes: {
        type: Object,
        required: true,
    },
});

console.log(props)

</script>

<template>
    <div class="w-full">
        <table class="table-auto w-full">
            <thead>
                <tr class="border bg-gray-200">
                    <th :colspan="(Object.keys(sizes).length+1)" class="border text-left px-2 text-sm">Color: {{ color  }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border">
                    <th class="border p-1 px-2 text-left w-48 text-sm">Size</th>

                    <td class="border p-1 px-2 text-center text-xs" v-for="(size, indexKey) in sizes" :key="indexKey">{{ size.size }}</td>
                </tr>
                <tr class="border">
                    <td class="border p-1 px-2 text-sm">Stock</td>
                    <td class="border p-1 px-2 text-center text-xs" v-for="(size, indexKey) in sizes" :key="indexKey">{{ size.stock }}</td>
                </tr>
                <tr class="border">
                    <td class="border p-1 px-2 text-sm">Discount Price</td>
                    <td class="border p-1 px-2 text-center text-xs" v-for="(size, indexKey) in sizes" :key="indexKey">{{ size.current_price }}</td>
                    
                </tr>
                <tr class="border">
                    <td class="border p-1 px-2 text-sm">Regular Price</td>
                    <td class="border p-1 px-2 text-center text-xs" v-for="(size, indexKey) in sizes" :key="indexKey">{{ size.regular_price }}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>