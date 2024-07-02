import { defineStore } from 'pinia'

interface FormData {
    email: string,
    password: string,
}
export const useLoginStore = defineStore('login',{
state: () => ({
    formData:{
        email: 'majadul.dev@gmail.com',
        password: '12345678',
    } as FormData,
    userData: {} as object,
    isLoggedIn: false as boolean,
    token:'' as string,
    loading: false as boolean,
    MasterKey: '' as string,
    EndPoint: '' as string,
}),

actions: {
    async login(){
        // replace with actual API endpoint and master key
        const config = useRuntimeConfig();
        this.EndPoint = config.public.baseURl;
        this.MasterKey = config.public.masterToken;
        this.loading = true;
        try {
            const res = await fetch(`${this.EndPoint}/login`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'App-Master-Key': `${this.MasterKey}`,
                },
                body: JSON.stringify(this.formData),
            })
            const data = await res.json();
            console.log(data);
            if(data.access_token && data.user_data){
                this.isLoggedIn = true;
                this.token = data.access_token;
                this.userData = data.user_data;
                localStorage.setItem('token', data.access_token);
            }

        } catch (error) {
            console.log(error);
        }finally{
            this.loading = false;
        }
    },
    async logout(){
        this.isLoggedIn = false;
        this.token = '';
        localStorage.removeItem('token');
    }
},
})