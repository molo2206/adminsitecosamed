import requests from './Instance'
const CategoryServices = {
	getCategories: async () => {
		return requests.get(`/category`)
	},
	create: async (body: any) => {
		return requests.post(`/category`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/category/${id}`, body, {})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/category/status/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/category/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
	getCategoryType: async (type:any) => {
		return requests.get(`/category/${type}/public`)
	},
}

export default CategoryServices
