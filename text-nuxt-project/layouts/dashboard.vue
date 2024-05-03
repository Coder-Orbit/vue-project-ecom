<template>
    <div class="w-full bg-gray-100">
        <div class="w-full fixed"><Header/></div>

        <div class="w-full flex">
            <div class="w-1/6 bg-red-500 mt-[3rem]"><Sidebar/></div>
            <div class="w-5/6 mt-14">
                <div class="min-h-[calc(100vh-5rem)]">
                    <NuxtLoadingIndicator />
                    <slot />
                </div>
                
                <div class="w-full"><Footer/></div>
            </div>
            
        </div>

        
        
        
    </div>
</template>