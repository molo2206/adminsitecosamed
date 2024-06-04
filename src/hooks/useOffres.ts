import { useAuthContext } from '@/common'
import OffresServices from '@/services/OffresServices'
import { useState } from 'react'
const useOffres = () => {
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

	const SaveOffre = (body: any) => {
		const formdata = new FormData()
		formdata.append('title', body?.title)
		formdata.append('description', body?.description)
		formdata.append('place', body?.place)
        formdata.append('startdate', body?.startdate)
        formdata.append('enddate', body?.enddate)
		if (body?.file) {
			formdata.append('file', body?.file)
		}

		setLoading(true)
		if (isEdit) {
			OffresServices.update(formdata, selected?.id)
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
			OffresServices.create(formdata)
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
		SaveOffre
	}
}

export default useOffres
