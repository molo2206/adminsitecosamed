import axios from 'axios'
import { ReactNode } from 'react'
import { useEffect } from 'react'
import { useAuthContext } from '@/common'
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
	const { token } = useAuthContext()
	useEffect(() => {
		instance.interceptors.request.use((config) => {
			return {
				...config,
				headers: {
					authorization: token ? `Bearer ${token}` : null,
				},
			}
		})
	}, [token])
	return children
}

instance.interceptors.request.use((config) => {
	return {
		...config,
		headers: {
			authorization: localStorage.getItem('_DICI_TOKEN')
				? `Bearer ${JSON.parse(localStorage.getItem('_DICI_TOKEN') || '')}`
				: undefined,
		},
	}
})
instance.interceptors.response.use(response => {
	return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
  }, error => Promise.reject(error));

const responseBody = (response: object) => response
const catchError = (error: object) => error

const requests = {
	get: (url: string) => instance.get(url).then(responseBody).catch(catchError),

	post: (url: string, body: string, headers: object) =>
		instance.post(url, body, headers),
	put: (url: string, body: string, headers: object) =>
		instance.put(url, body, headers),

	patch: (url: string, body: string, headers: object) =>
		instance.patch(url, body, headers).then(responseBody).catch(catchError),

	delete: (url: string) => instance.delete(url).then(responseBody),
}

export default requests
export { AxiosInterceptor }
