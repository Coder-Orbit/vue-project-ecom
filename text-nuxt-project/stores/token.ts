export const useTokenStore = defineStore('token',{
state: () => ({
    isLoggedIn: false as boolean,
    token:'' as string,
}),

actions: {
    setToken(token : string){
        this.token = token;
        this.isLoggedIn = true;
    },
    removeToken(){
        this.isLoggedIn = false;
        this.token = '';
        localStorage.removeItem('token');
    }
},
persist: true,
})