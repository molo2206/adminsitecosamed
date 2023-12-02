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
		setImageUrl
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const createTeam = (body: any) => {
		const formdata = new FormData()
		formdata.append('full_name', body?.full_name)
		formdata.append('email', body?.email)
		formdata.append('fonction', body?.fonction)
		if(image){
			formdata.append('image', image)
		}
		// formdata.append('liens_sociaux',selectedType?.map((item:any) => {
		// 	return {
		// 		item
		// 	}
		// }))


		setLoading(true)
		if (isEdit) {
			TeamServices.update(formdata, selected?.id)
				.then((response) => {
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
				.then((response) => {
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
		createTeam
	}
}

export default useTeam
