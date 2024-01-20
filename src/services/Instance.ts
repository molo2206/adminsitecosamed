import axios from 'axios'
import { ReactNode } from 'react'
import { BASE_URL } from '@/utils/heleprs'
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 50000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		//Authorization:"Bearer 74|YWAaOoLAYDc7bggEg9qhtV14tYGABjeiDsvGn4wt88a337a1"
	},
})

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
	return children
}

instance.interceptors.request.use((config) => {
	return {
		...config,
		headers: {
			Accept: 'application/json',
			authorization: localStorage.getItem('_DICI_TOKEN')
				? `Bearer ${JSON.parse(localStorage.getItem('_DICI_TOKEN') || '')}`
				: undefined,
		},
	}
})

instance.interceptors.response.use(
	function (response) {
		// Optional: Do something with response data
		return response
	},
	function (error) {
		// Do whatever you want with the response error here:

		// But, be SURE to return the rejected promise, so the caller still has
		// the option of additional specialized handling at the call-site:
		return Promise.reject(error)
	}
)



const requests = {
	get: (url: string) => instance.get(url),

	post: (url: string, body: string, headers: object) =>
		instance.post(url, body, headers).then((response:any) => response).catch((error:any) => error),
	put: (url: string, body: string, headers: object) =>
		instance.put(url, body, headers),

	patch: (url: string, body: string, headers: object) =>
		instance.patch(url, body, headers),

	delete: (url: string) => instance.delete(url),
}

export default requests
export { AxiosInterceptor }
