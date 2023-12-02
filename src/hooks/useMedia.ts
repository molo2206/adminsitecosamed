import { useAuthContext } from '@/common'
import MediaServices from '@/services/MediaServices'
import { useState } from 'react'
import useValidation from './useValidation'
const useMedia = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
		setImage,
		setImageUrl,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)
	const { setInputs } = useValidation({})

	const createMedia = (body: any) => {
		const files = [...body?.image]
		const formdata = new FormData()
		formdata.append('category_id', body?.category_id)
		if (body?.country_id) {
			formdata.append('country_id', body?.country_id)
		}
		if (body?.city_id) {
			formdata.append('city_id', body?.city_id)
		}
		formdata.append('type', body?.type)
		formdata.append('url', body?.url || null)
		if (files.length > 0) {
			files.forEach((file, i) => {
				formdata.append(`cover[]`, file, file.name)
			})
		}
		setLoading(true)
		if (isEdit) {
			MediaServices.update(formdata, selected?.id)
				.then((response) => {
					setInputs({})
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					setImage(null)
					setImageUrl(null)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			MediaServices.create(formdata)
				.then((response) => {
					setInputs({})
					setIsEdit(false)
					setSelected(null)
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setImage(null)
					setImageUrl(null)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
	}

	return {
		loading,
		createMedia,
	}
}

export default useMedia
