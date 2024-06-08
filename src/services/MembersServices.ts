import requests from './Instance'
const MembersServices = {
	
	getMembers: async () => {
		return requests.get(`/members`)
	},

	create: async (body: any) => {
		return requests.post(`/members`, body, {})
	},

	oneMember: async (id: any) => {
		return requests.get(`/members/${id}`)
	},

	update: async (body: any, id: string) => {
		return requests.post(`/members/${id}`, body, {})
	},

	status: async (body: any, id: string) => {
		return requests.post(`/member/${id}`, body, {})
	},

	delete: async (id: string) => {
		return requests.delete(`/members/${id}`)
	},
	
	setPermissions: async (body: any) => {
		return requests.post('/assign-permissions', body,{})
	},
	
}

export default MembersServices
