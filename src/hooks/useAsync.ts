import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/common'
const useAsync = (asyncFunction: any) => {
	const [data, setData] = useState<any>([] || {})
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)
	const { refresh } = useAuthContext()

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()
		;(async () => {
			try {
				//setLoading(true);
				const res = await asyncFunction({ cancelToken: source.token })
				if (!unmounted) {
					setData(res.data.data)
					setError('')
					setLoading(false)
				}
			} catch (err: any) {
				if (!unmounted) {
					setError(err.message)
					if (axios.isCancel(err)) {
						setError(err)
						setLoading(false)
						setData([])
					} else {
						setError(err)
						setLoading(false)
						setData([])
					}
				}
			}
		})()

		return () => {
			unmounted = true
			source.cancel('error canceled')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh])

	return {
		data,
		error,
		loading,
	}
}

export default useAsync
