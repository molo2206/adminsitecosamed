import requests from './Instance'
const RoleServices = {
	getRole: async () => {
		return requests.get(`/roles`)
	},
	create: async (body: any) => {
		return requests.post(`/roles`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/roles/${id}`, body, {})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/roles/status/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/roles/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default RoleServices
