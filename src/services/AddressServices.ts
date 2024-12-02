import requests from './Instance'
const AddressServices = {
	getAddresses: async () => {
		return requests.get(`/address`)
	},
	create: async (body: any) => {
		return requests.post(`/address`, body, {})
	},
	update: async (body: any, id: string) => {
		return requests.put(`/address/${id}`, body, {})
	},
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	getBooks: async () => {
		return requests.get('/public/books')
	},
}

export default AddressServices
