import requests from './Instance'
const EventServices = {
	getEvent: async () => {
		return requests.get(`/events`)
	},
	create: async (body: any) => {
		return requests.post(`/events`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	oneEvent: async (id: any) => {
		return requests.get(`/events/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/events/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/events/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/events/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default EventServices
