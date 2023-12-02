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
			.then((response) => {
				successNotification(response.data.message)
				setLoading(false)
				saveSession(response?.data?.token)
				saveUser(response?.data?.data)
				navigate(redirectUrl)
			})
			.catch((err) => {
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
			})
	}

	return { loading, login, redirectUrl, isAuthenticated }
}
