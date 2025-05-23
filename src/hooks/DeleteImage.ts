// hooks/useDeleteImage.ts
import { useAuthContext } from '@/common'
import BlogsServices from '@/services/BlogsServices'
import { useState } from 'react'

const useDeleteImage = () => {
	const { errorNotification, successNotification, forceUpdate } =
		useAuthContext()
	const [loading, setLoading] = useState(false)

	const deleteImageById = async (id: any) => {
		setLoading(true)
		try {
			const response = await BlogsServices.deleteImage(id)
			forceUpdate()
			successNotification(response.data.message)
		} catch (err: any) {
			errorNotification(err?.response?.data?.message || err.message)
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		deleteImageById,
	}
}

export default useDeleteImage
