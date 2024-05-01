import { useAuthContext } from '@/common'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthServices from '@/services/AuthServices'
import type { User } from '@/types'

export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const {
		isAuthenticated,
		saveSession,
		saveUser,
		errorNotification,
		successNotification,
	} = useAuthContext()

	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	)

	const login = async ({ email, password }: User) => {
		setLoading(true)
		AuthServices.login({ email, password })
			.then((response: any) => {
				successNotification(response.data.message)
				saveSession(response?.data?.token)
				saveUser(response?.data?.data)
				navigate(redirectUrl)
				setLoading(false)
	
			})
			.catch((err: any) => {
				console.log(err)
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
				// if (error.response) {
				// 	// The request was made and the server responded with a status code
				// 	// that falls out of the range of 2xx
				// 	console.log(error.response.data)
				// 	console.log(error.response.status)
				// 	console.log(error.response.headers)
				// } else if (error.request) {
				// 	// The request was made but no response was received
				// 	// `error.request` is an instance of XMLHttpRequest in the browser
				// 	// and an instance of http.ClientRequest in node.js
				// 	console.log(error.request)
				// } else {
				// 	// Something happened in setting up the request that triggered an Error
				// 	console.log('Error', error.message)
				// }
			})
	}

	return { loading, login, redirectUrl, isAuthenticated }
}
