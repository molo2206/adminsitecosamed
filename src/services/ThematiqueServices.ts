import requests from './Instance'

const ThematiqueServices = {
    getThematiques: async () => {
        return requests.get(`/thematiques`)
    },
    create: async (body: any) => {
        return requests.post(`/thematiques`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    oneThematiques: async (id: any) => {
        return requests.get(`/thematiques/${id}`)
    },
    update: async (body: any, id: string) => {
        return requests.post(`/thematiques/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    status: async (body: any, id: string) => {
        return requests.post(`/thematique/${id}`, body, {})
    },
    delete: async (id: string) => {
        return requests.delete(`/thematiques/${id}`)
    },
    setPermissions: async (body: any) => {
        return requests.post('/assign-permissions', body, {

        })
    },
}

export default ThematiqueServices
