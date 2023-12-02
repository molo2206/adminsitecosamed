import requests from './Instance'
const ServiceServices = {
	getServices: async () => {
		return requests.get(`/services`)
	},
	create: async (body: any) => {
		return requests.post(`/services`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	oneService: async (id: any) => {
		return requests.get(`/services/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/services/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/services/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/services/${id}`)
	},

}

export default ServiceServices
