export const useProductStore = defineStore('product',{
    state: () => ({
        additional: []
    }),
    getters:{
        getAdditional : (state) => state.additional
    },
    actions: {
        setAdditional(sizeData, colorData, fieldName, fieldValue){
            this.additional = {
                ...this.additional,
                colorData
            }
          
        },
        removeAdditional(){
            console.log("remove")
        }
    },

})