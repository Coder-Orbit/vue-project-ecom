export const useMailStore = defineStore ("mail",{
    state : () => ({
    }),
    getters: {
    },
    actions: {
                // Update Slide In "/brand/:id" Page
                async updateMail(MailData) {
                    const config = useRuntimeConfig();
                    const EndPoint = config.public.baseURl;
                    const MasterKey = config.public.masterToken;
                    const app_token = useTokenStore().getToken;
                    const formData = MailData;
                    try {
                    const res = await fetch(`${EndPoint}/admin/${MasterKey}/mail_configuration`, {
                        method: "POST",
                        headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${app_token}`,
                        },
                        body: JSON.stringify(formData),
                    });
                    const data = await res.json();
                    return data;
                    } catch (error) {
                    console.log(error);
                    return { success: false, message: 'An error occurred during Request' };
                    }
                },
    }
})