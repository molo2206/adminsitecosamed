import { useAuthContext } from '@/common'
import TeamServices from '@/services/TeamServices'
import { useState } from 'react'
const useTestimonials = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
		image,
		setImage,
		setImageUrl,
		pageLang,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const saveData = (body: any) => {
		if (image) {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = image?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				errorNotification('Image is too big (max 5 mb)')
				return
			}
		}
		const formdata = new FormData()
		formdata.append('name', body?.name)
		formdata.append('message', body?.message)
		formdata.append('fonction', body?.fonction)
		formdata.append('locale', pageLang)
		if (image) {
			formdata.append('image', image)
		}

		setLoading(true)
		if (isEdit) {
			TeamServices.updateTestimonials(formdata, selected?.id)
				.then((response:any) => {
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
			TeamServices.createTestimonials(formdata)
				.then((response:any) => {
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
	const saveBook = (body: any) => {
		const formdata = new FormData()
		formdata.append('title', body?.title)
		formdata.append('description', body?.description)
		formdata.append('price', body?.price)
		if (body?.image) {
			formdata.append('image', body?.image)
		}
		if (body?.file) {
			formdata.append('file', body?.file)
		}

		setLoading(true)
		if (isEdit) {
			TeamServices.updateBook(formdata, selected?.id)
				.then((response:any) => {
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
			TeamServices.createBook(formdata)
				.then((response:any) => {
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
					console.log(err)
				})
		}
	}

	return {
		loading,
		saveData,
		saveBook
	}
}

export default useTestimonials
