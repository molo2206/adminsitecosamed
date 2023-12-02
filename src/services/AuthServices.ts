import requests from './Instance'
const AuthServices = {
	login: async (body: any) => {
		return requests.post('/auth/login', body, {})
	},
	_showProfile: async () => {
		return requests.get('/auth/show-profile')
	},
	_updateProfile: async (body: any) => {
		return requests.put('/auth/update-profile', body, {})
	},
	_updatePassword: async (body: any) => {
		return requests.put('/auth/update-password', body, {})
	},
	_updateImage: async (body: any) => {
		return requests.post('/auth/update-photo', body, {
			headers: {
				'Content-Type': 'multipart/formdata',
			},
		})
	},
}

export default AuthServices
