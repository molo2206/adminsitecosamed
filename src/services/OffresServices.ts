import requests from './Instance'
const OffresServices = {
	getOffres: async () => {
		return requests.get(`/offres`)
	},
	create: async (body: any) => {
		return requests.post(`/offres`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	oneOffres: async (id: any) => {
		return requests.get(`/offres/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/offres/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/offres/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/offres/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {

		})
	},
}

export default OffresServices
