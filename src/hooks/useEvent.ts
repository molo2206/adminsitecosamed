import { useAuthContext } from '@/common'
import EventServices from '@/services/EventServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
const useEvent = () => {
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

	const createEvent = (body: any) => {
		setLoading(true)

		const formdata = new FormData()
		formdata.append('title', body?.title)
		formdata.append('description', body?.description)
		formdata.append('debut', body?.debut)
		formdata.append('debut', body?.debut)
		formdata.append('fin', body?.fin)
		formdata.append('in', body?.in)
		formdata.append('out', body?.out)
		formdata.append('locale', pageLang)
		formdata.append('category_id', body?.category)
		formdata.append('country_id', body?.country)
		formdata.append('city_id', body?.city)
		if (body?.image) {
			formdata.append('image', body?.image)
		}

		if (
			location.pathname === `/events/edit/${location.pathname.split('/')[3]}`
		) {
			EventServices.update(formdata, location.pathname.split('/')[3])
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					setImage(null)
					setImageUrl(null)
					closeModal()
					navigation('/events/list', { replace: true })
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
		if (location.pathname === '/events/create') {
			EventServices.create(formdata)
				.then((response) => {
					setIsEdit(false)
					setSelected(null)
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setImage(null)
					setImageUrl(null)
					closeModal()
					navigation('/events/list', { replace: true })
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
					console.log(err)
				})
		}
	}

	return {
		loading,
		createEvent,
	}
}

export default useEvent
