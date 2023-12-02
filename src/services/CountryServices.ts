import requests from './Instance'
const CountryServices = {
	getCountry: async () => {
		return requests.get(`/country`)
	},
	getCity: async () => {
		return requests.get(`/city`)
	},
	create: async (body: any) => {
		return requests.post(`/country`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/country/${id}`, body, {})
	},
	status: async (body: any, id: string) => {
		return requests.put(`/country/status/${id}`, body, {})
	},
	delete: async (id: string) => {
		return requests.delete(`/country/${id}`)
	},
	statusCity: async (body: any, id: string) => {
		return requests.put(`/city/status/${id}`, body, {})
	},
	deleteCity: async (id: string) => {
		return requests.delete(`/city/${id}`)
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},

	createCity: async (body: any) => {
		return requests.post(`/city`, body, {})
	},
	updateCity: async (body: any, id: string) => {
		return requests.put(`/city/${id}`, body, {})
	},
}

export default CountryServices
