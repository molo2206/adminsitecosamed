import requests from './Instance'

const TypeMemberService = {
    
    getTypeMembers: async () => {
        return requests.get(`/typemember`)
    },

    create: async (body: any) => {
        return requests.post(`/typemember`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    oneTypeMember: async (id: any) => {
        return requests.get(`/typemember/${id}`)
    },
    update: async (body: any, id: string) => {
        return requests.post(`/typemember/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    status: async (body: any, id: string) => {
        return requests.post(`/typemember/${id}`, body, {})
    },
    delete: async (id: string) => {
        return requests.delete(`/typemember/${id}`)
    },
    setPermissions: async (body: any) => {
        return requests.post('/assign-permissions', body, {

        })
    },
}

export default TypeMemberService
