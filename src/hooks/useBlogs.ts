import { useAuthContext } from '@/common'
import EventServices from '@/services/BlogsServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const useBlogs = () => {
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

	const createBlogs = (body: any) => {
		setLoading(true)
		const formdata = new FormData()

		formdata.append('title', body?.title)
		formdata.append('description', body?.description)
		formdata.append('author', body?.author)
		formdata.append('locale', pageLang)
		formdata.append('category_id', body?.category)
		formdata.append('documentation', body?.documentation)
		formdata.append('publication_date', body?.publication_date)

		if (body?.image) {
			formdata.append('image', body.image)
		}

		// ✅ Images supplémentaires
		if (body?.images && body.images.length > 0) {
			for (let i = 0; i < body.images.length; i++) {
				formdata.append('images[]', body.images[i])
			}
		}

		const isEditPath =
			location.pathname === `/blog/edit/${location.pathname.split('/')[3]}`

		const onSuccess = (response: any) => {
			if (response?.status === 200) {
				forceUpdate()
				successNotification(response.data.message)
				setIsEdit(false)
				setSelected(null)
				setImage(null)
				setImageUrl(null)
				closeModal()
				navigation('/blog/listblog', { replace: true })
			} else {
				errorNotification('An error occurred, please verify the image dimensions')
			}
			setLoading(false)
		}

		const onError = (err: any) => {
			errorNotification(
				err?.response?.data?.message ||
					err?.message ||
					'An error occurred, verify your image dimensions'
			)
			setLoading(false)
			console.error(err)
		}

		if (isEditPath) {
			EventServices.update(formdata, location.pathname.split('/')[3])
				.then(onSuccess)
				.catch(onError)
		} else if (location.pathname === '/blog/create') {
			EventServices.create(formdata).then(onSuccess).catch(onError)
		}
	}

	return {
		loading,
		createBlogs,
	}
}

export default useBlogs
