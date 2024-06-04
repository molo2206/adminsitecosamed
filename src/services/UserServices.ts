import requests from './Instance'
const UserServices = {
	getUsers: async () => {
		return requests.get(`/users`)
	},

	getMembers: async () => {
		return requests.get(`/member`)
	},

	create: async (body: any) => {
		return requests.post(`/users`, body, {})
	},

	update: async (body: any, id: string) => {
		return requests.put(`/users/${id}`, body, {})
	},

	status: async (body: any, id: string) => {
		return requests.put(`/users/status/${id}`, body, {})
	},

	delete: async (id: string) => {
		return requests.delete(`/users/${id}`)
	},
	
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default UserServices
