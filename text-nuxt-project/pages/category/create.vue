<script setup>
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import Sidebar from 'primevue/sidebar';


    const router = useRouter();
    definePageMeta({
        layout: "dashboard",
    })

    const visibleRight = ref(false);

</script>
<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">

<div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
    <div class="flex w-full justify-between  bg-gray-500 text-white">
        
        <div class="font-semibold mt-1 ml-3">Create Category</div>
        <div class="font-semibold ml-1 flex">
            <button @click="$router.back()" class="bg-red-600 hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-tr-sm">
                <Icon name="gg:arrow-left-o"></Icon>
                Back
            </button>
        </div>
        
    </div>
    <!-- Body Content goes here -->
    <div class=" h-[calc(100vh-8rem)] overflow-y-auto border-b px-3 pt-3">
        <p>hello</p>
    </div>
    
</div>

</div>
    </NuxtLayout>
</template>