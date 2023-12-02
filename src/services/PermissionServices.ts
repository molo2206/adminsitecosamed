import requests from './Instance'
const PermissionServices = {
	getPermissions: async () => {
		return requests.get(`/permissions`)
	},
	get_resources: async () => {
		return requests.get(`/get_resources`)
	},
	create: async (body: any) => {
		return requests.post(`/permissions`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/permissions/${id}`, body, {})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/permissions/status/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/permissions/${id}`)
	},
	getTeam: async () => {
		return requests.get('/public/team')
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default PermissionServices
