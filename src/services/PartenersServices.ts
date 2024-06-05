import requests from './Instance'
const PartenersServices = {
	getParteners: async () => {
		return requests.get(`/parteners`)
	},
	create: async (body: any) => {
		return requests.post(`/parteners`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	onePartener: async (id: any) => {
		return requests.get(`/parteners/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/partener/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.post(`/parteners/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/parteners/${id}`)
	},	
}

export default PartenersServices
