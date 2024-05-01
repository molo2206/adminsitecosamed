import requests from './Instance'
const TeamServices = {
	getTeam: async () => {
		return requests.get(`/team`)
	},
	create: async (body: any) => {
		return requests.post(`/team`, body, {
			headers: {
				Accept:'application/json',
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	update: async (body: any, id: string) => {
		return requests.post(`/team/${id}`, body, {
			headers: {
				
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/team/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/team/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},

	getTestimonials: async () => {
		return requests.get(`/testimonials`)
	},

	//testimonials

	updateTestimonials: async (body: any, id: string) => {
		return requests.post(`/testimonials/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	statusTesti: async (body: any, id: string) => {
		return requests.put(`/testimonials/${id}`, body, {})
	},
	deleteTesti: async (id: string) => {
		return requests.delete(`/testimonials/${id}`)
	},
	updateBook: async (body: any, id: string) => {
		return requests.post(`/books/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	statusBooks: async (body: any, id: string) => {
		return requests.put(`/books/${id}`, body, {})
	},
	deleteBooks: async (id: string) => {
		return requests.delete(`/books/${id}`)
	},
	createTestimonials: async (body: any) => {
		return requests.post(`/testimonials`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	createBook: async (body: any) => {
		return requests.post(`/books`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	getAdminBooks: async () => {
		return requests.get(`/books`)
	},
	getAdminBulletins: async () => {
		return requests.get(`/bulletins`)
	},
}

export default TeamServices
