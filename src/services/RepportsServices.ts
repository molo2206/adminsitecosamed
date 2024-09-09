import requests from './Instance'
const RepportsServices = {
	getRepport: async () => {
		return requests.get(`/rapports`)
	},
	create: async (body: any) => {
		return requests.post(`/rapports`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	oneRepport: async (id: any) => {
		return requests.get(`/rapports/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/rapports/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.post(`/rapports/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/rapports/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
	},
}

export default RepportsServices
