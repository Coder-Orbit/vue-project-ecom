<script setup lang="ts">
    import { ref } from "vue";
    import PanelMenu from 'primevue/panelmenu';

    const items = ref([
    {
        label: 'Files',
        icon: 'pi pi-file',
        items: [
            {
                label: 'Documents',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Invoices',
                        icon: 'pi pi-file-pdf',
                        items: [
                            {
                                label: 'Pending',
                                icon: 'pi pi-stop'
                            },
                            {
                                label: 'Paid',
                                icon: 'pi pi-check-circle'
                            }
                        ]
                    },
                    {
                        label: 'Clients',
                        icon: 'pi pi-users'
                    }
                ]
            },
            {
                label: 'Images',
                icon: 'pi pi-image',
                items: [
                    {
                        label: 'Logos',
                        icon: 'pi pi-image'
                    }
                ]
            }
        ]
    },
    {
        label: 'Cloud',
        icon: 'pi pi-cloud',
        items: [
            {
                label: 'Upload',
                icon: 'pi pi-cloud-upload'
            },
            {
                label: 'Download',
                icon: 'pi pi-cloud-download'
            },
            {
                label: 'Sync',
                icon: 'pi pi-refresh'
            }
        ]
    },
    {
        label: 'Devices',
        icon: 'pi pi-desktop',
        items: [
            {
                label: 'Phone',
                icon: 'pi pi-mobile'
            },
            {
                label: 'Desktop',
                icon: 'pi pi-desktop'
            },
            {
                label: 'Tablet',
                icon: 'pi pi-tablet'
            }
        ]
    }
]);

</script>
<template>
    <div class="sidebar_menu w-full left-0 max-h-[calc(100vh-3rem)]">
        <PanelMenu :model="items" class="p-0 m-0">
            <template #item="{ item }" class="p-0 m-0 !rounded-none ">
                <NuxtLink class="p-0 m-0 !rounded-none" v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <NuxtLink class="flex !rounded-none align-items-center cursor-pointer text-color px-3 py-2" :href="href" @click="navigate">
                        <span :class="item.icon" class="!rounded-none " />
                        <span class="ml-2 text-color">{{ item.label }} 1</span>
                    </NuxtLink>
                </NuxtLink>
                <NuxtLink v-else  class="flex !rounded-none align-items-center cursor-pointer text-color px-3 py-2" :href="item.url" :target="item.target">
                    <span :class="item.icon" />
                    <span class="ml-2 !rounded-none">{{ item.label }} 2</span>
                    <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
                </NuxtLink>
            </template>
        </PanelMenu>
        
    </div>
</template>