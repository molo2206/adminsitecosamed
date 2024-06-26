import requests from './Instance'
const SettingServices = {
	getLanguage: async () => {
		return requests.get('/public/langues')
	},
	saveAbout: async (body: any) => {
		return requests.post('/settings/about-us', body, {})
	},
	saveSettings: async (body: any) => {
		return requests.post('/settings/setting', body, {})
	},
	saveLogos: async (body: any) => {
		return requests.post('/settings/logo', body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	saveImages: async (body: any) => {
		return requests.post('/settings/images', body, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept:"application/json"
			},
		})
	},
	getGlobalSettings: async () => {
		return requests.get('/settings')
	},
	getAddresses: async () => {
		return requests.get('/public/adresses')
	},
	getVisarequests: async () => {
		return requests.get('/all-visa-requests')
	},
	getTravelrequests: async () => {
		return requests.get('/all-travel-requests')
	},

	_one_request: async (id: any) => {
		return requests.get('/demande/' + id)
	},
}

export default SettingServices
