import requests from './Instance'
const BlogServices = {
	getBlog: async () => {
		return requests.get(`/blogs`)
	},
	create: async (body: any) => {
		return requests.post(`/blogs`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	oneBlog: async (id: any) => {
		return requests.get(`/blogs/${id}`)
	},
	update: async (body: any, id: string) => {
		return requests.post(`/blogs/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	status: async (body: any, id: string) => {
		return requests.post(`/blog/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/blogs/${id}`)
	},

	deleteImage: async (id: string) => {
		return requests.delete(`/image-blog/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body, {})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default BlogServices
