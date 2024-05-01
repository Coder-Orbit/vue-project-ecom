<script setup>


import Menu from 'primevue/menu';


import { ref } from "vue";

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Username',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Email',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Pin',
                icon: 'pi pi-refresh'
            },
            
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog'
            },
            {
                label: 'Change Password',
                icon: 'pi pi-upload'
            
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out'
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="w-full border-b flex justify-between px-3">
        <div>
            01
        </div>
        <div>
            <div class="card flex justify-content-center">
                <img alt="logo" src="/logo.png" class="w-6 h-6 border rounded-full cursor-pointer" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
            </div>
        </div>
    </div>
</template>
