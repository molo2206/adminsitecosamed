import requests from './Instance'
const ProjetServices = {
	getProject: async () => {
		return requests.get(`/projets`)
	},
	oneProject: async (id: any) => {
		return requests.get(`/projets/${id}`)
	},
	create: async (body: any) => {
		return requests.post(`/projets`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},

	update: async (body: any, id: string) => {
		return requests.post(`/projets/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},

	status: async (body: any, id: string) => {
		return requests.post(`/project/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},

	delete: async (id: string) => {
		return requests.delete(`/projets/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default ProjetServices
