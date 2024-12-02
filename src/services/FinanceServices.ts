import requests from './Instance'
const FinanceServices = {
    getFinance: async () => {
        return requests.get(`/finance`)
    },
    create: async (body: any) => {
        return requests.post(`/finance`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    oneFinance: async (id: any) => {
        return requests.get(`/finance/${id}`)
    },
    update: async (body: any, id: string) => {
        return requests.post(`/finance/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    status: async (body: any, id: string) => {
        return requests.post(`/finance/${id}`, body, {})
    },
    delete: async (id: string) => {
        return requests.delete(`/finance/${id}`)
    },
    setPermissions: async (body: any) => {
        return requests.post('/assign-permissions', body, {

        })
    },
}

export default FinanceServices
