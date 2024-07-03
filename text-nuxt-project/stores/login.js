
export const useLoginStore = defineStore('login',{
state: () => ({
    userData: {} ,
    loading: false ,
}),
actions: {
    async login(form){
        // replace with actual API endpoint and master key
        const config = useRuntimeConfig();
        const EndPoint = config.public.baseURl;
        const MasterKey = config.public.masterToken;
        const formData = form;
        const token = useTokenStore();

        this.loading = true;
        try {
            const res = await fetch(`${EndPoint}/login`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'App-Master-Key': `${MasterKey}`,
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log(data);
            if(data.access_token && data.user_data){
                token.setToken(data.access_token);
                this.userData = data.user_data;
            }
        } catch (error) {
            console.log(error);
        }finally{
            this.loading = false;
        }
    },
},
persist: true,
})