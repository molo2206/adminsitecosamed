import { useAuthContext } from '@/common'
import ServiceServices from '@/services/ServiceServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
const useServices = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		setIsEdit,
		setSelected,
		pageLang,
		setImage,
		setImageUrl,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)
	const navigation = useNavigate()
	const location = useLocation()

	const createService = (body: any) => {
		setLoading(true)

		const formdata = new FormData()
		formdata.append('title', body?.title)
		formdata.append('description', body?.description)
		formdata.append('type', body?.type)
		formdata.append('locale', pageLang)
		if (body?.image) {
			formdata.append('image', body?.image)
		}

		if (
			location.pathname === `/services/edit/${location.pathname.split('/')[3]}`
		) {
			ServiceServices.update(formdata, location.pathname.split('/')[3])
				.then((response: any) => {
					setLoading(false)
					if (response?.status === 200) {
						forceUpdate()
						successNotification(response.data.message)
				
						setIsEdit(false)
						setSelected(null)
						setImage(null)
						setImageUrl(null)
						closeModal()
						navigation('/services/list', { replace: true })
					} else {
						errorNotification(
							'An error occured, please verify the image dimensions'
						)
					}
				})
				.catch((err) => {
					errorNotification(
						err?.response
							? err.response.data.message
							: err.message
							? err.message
							: 'An error ocurred verifiy your image dimensions'
					)
					setLoading(false)
				})
		}
		if (location.pathname === '/services/create') {
			ServiceServices.create(formdata)
				.then((response: any) => {
					setLoading(false)
					if (response?.status === 200) {
						setIsEdit(false)
						setSelected(null)
						forceUpdate()
						successNotification(response.data.message)
						setLoading(false)
						setImage(null)
						setImageUrl(null)
						closeModal()
						navigation('/services/list', { replace: true })
					} else {
						errorNotification(
							'An error occured, please verify the image dimensions'
						)
					}
				})
				.catch((err) => {
					errorNotification(
						err?.response
							? err.response.data.message
							: err.message
							? err.message
							: 'An error ocurred verifiy your image dimensions'
					)
					setLoading(false)
					console.log(err)
				})
		}
	}

	return {
		loading,
		createService,
	}
}

export default useServices
