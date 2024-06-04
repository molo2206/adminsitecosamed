import requests from './Instance'
const BulletinsService = {
	getBulletins: async () => {
		return requests.get(`/bulletins`)
	},
	create: async (body: any) => {
		return requests.post(`/bulletins`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	oneBulletin: async (id: any) => {
		return requests.get(`/bulletins/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/bulletin/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.post(`/bulletins/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/bulletins/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
	},
}

export default BulletinsService
