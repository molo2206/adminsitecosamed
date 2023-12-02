import requests from './Instance'
const MediaServices = {
	getMedia: async (type:any) => {
		return requests.get(`/media/${type}`)
	},
	create: async (body: any) => {
		return requests.post(`/media`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	update: async (body: any, id: string) => {
		return requests.post(`/media/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {
			
		})
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
				'Content-Type': 'multipart/formdata',
			},
		})
	},
	createTestimonials: async (body: any) => {
		return requests.post(`/testimonials`, body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
}

export default MediaServices
