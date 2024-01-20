import { useAuthContext } from '@/common'
import TeamServices from '@/services/TeamServices'
import { useState } from 'react'
const useTeam = () => {
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
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const createTeam = (body: any) => {
		if (image) {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = image?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				errorNotification('Image is too big (max 5 mb)')
				return
			}
		}
		const formdata = new FormData()
		formdata.append('full_name', body?.full_name)
		formdata.append('email', body?.email)
		formdata.append('fonction', body?.fonction)
		formdata.append('facebook', body?.facebook)
		formdata.append('twitter', body?.twitter)
		formdata.append('instagram', body?.instagram)
		formdata.append('linkedin', body?.linkedin)
		if (image) {
			formdata.append('image', image)
		}
		setLoading(true)
		if (isEdit) {
			TeamServices.update(formdata, selected?.id)
				.then((response: any) => {
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
			TeamServices.create(formdata)
				.then((response: any) => {
					setLoading(false)
					if (response?.status === 200) {
						setIsEdit(false)
						setSelected(null)
						forceUpdate()
						successNotification(response.data.message)

						setImage(null)
						setImageUrl(null)
						closeModal()
					} else {
						errorNotification(
							'An error occured, please verify the image dimensions'
						)
					}
				})
				.catch((err) => {
					errorNotification(err ? err.response?.data?.message : err?.message)
					setLoading(false)
				})
		}
	}

	return {
		loading,
		createTeam,
	}
}

export default useTeam
