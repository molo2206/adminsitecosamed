import requests from './Instance'
const DashboardServices = {
	getStatistics: async () => {
		return requests.get(`/dashboard/statistic`)
	},
	create: async (body: any) => {
		return requests.post(`/users`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/users/${id}`, body, {})
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default DashboardServices
