<script setup>
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const config = useRuntimeConfig();
const EndPoint = config.public.baseURl;
const MasterKey = config.public.masterToken;

const router = useRouter();
const token = useTokenStore();
const toast = useToast();

const form = reactive({
    current_password:"",
    password: "",
    password_confirmation:"",
   
});

definePageMeta({
    middleware: ['auth'],
})

// async function handleLogin() {
//     // console.log("hello");
//   const result = await store.login(form);
//   fetchPermissions();
//   if (result.success) {
//     router.push('/dashboard');
//   } else {
//     toast.add({
//       severity: 'error',
//       summary: 'Login Failed',
//       detail: result.message,
//       life: 3000,
//     });
//   }

// }

const submitHandler = async() =>{
    try {
        const res = await $fetch(`${EndPoint}/admin/${MasterKey}/updatePassword`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Authorization" : `Bearer ${token.token}`
                },
                body: JSON.stringify(form)
            })
        if (res) {

            // Show success message
            toast.add({ severity: 'success', summary: 'Success', detail: 'Password Update successful!', life: 4000 });
            setTimeout(() => {
                router.push('/dashboard'); 
            }, 3000);
        }
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 }); 
    }
}

</script>

<template>

    <div>
        
        <Toast />
        <div class="min-h-screen bg-gray-100 fixed w-full -z-50">
        <div class="place-content-center">
            <div class="p-3 mt-12 w-24 mx-auto"><img alt="logo" src="/logo.png"></div>
            
        </div>
        
            <div class="w-80 bg-white shadow-lg rounded-lg p-4 mx-auto bg-opacity-75">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">Change Password</h5>
                <form @submit.prevent='submitHandler'>
                    
                    <label class="block mt-2"><span class="block text-sm font-medium text-slate-700">Current Password</span>
                        <input  v-model="form.current_password" type="password" name="password"  class="mt-1 block w-full px-3 py-1 focus:outline-none bg-white border border-slate-300 rounded-md text-sm focus:border-gray-500 ">
                    </label>
                    <label class="block mt-2"><span class="block text-sm font-medium text-slate-700">New Password</span>
                        <input  v-model="form.password" type="password" name="password"  class="mt-1 block w-full px-3 py-1 focus:outline-none bg-white border border-slate-300 rounded-md text-sm focus:border-gray-500 ">
                    </label>
                    <label class="block mt-2"><span class="block text-sm font-medium text-slate-700">Confirmation Password</span>
                        <input  v-model="form.password_confirmation" type="password" name="password"  class="mt-1 block w-full px-3 py-1 focus:outline-none bg-white border border-slate-300 rounded-md text-sm focus:border-gray-500 ">
                    </label>
                   

                    <button type="submit" class="px-3 mt-4 mb-4 py-3 w-full text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-600 focus:outline-none">Update</button>
                </form>
                

            </div>
        
            <img class="background" src="/landscape.svg" />

            
        
        </div>
    </div>
</template>

<style>

    .background {

        position: absolute;
        bottom: 0;
        z-index: -1;
        width: 100%;
    }
</style>