import requests from './Instance'
const CommunicatedServices = {
	getCommuniques: async () => {
		return requests.get(`/communiques`)
	},
	create: async (body: any) => {
		return requests.post(`/communiques`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	oneCommuniques: async (id: any) => {
		return requests.get(`/communiques/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/communiques/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.post(`/communique/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/communiques/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default CommunicatedServices
