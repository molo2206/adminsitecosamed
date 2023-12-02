import { useAuthContext } from '@/common'
import CategoryServices from '@/services/CategoryServices'
import { useState } from 'react'
const useCategory = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
		selectedType,
		setSelectedType,
		pageLang,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const createCategory = (body: any) => {
		if(!selectedType){
			errorNotification('Please select a type')
			return;
		}
		setLoading(true)
		const data = {
			name: body?.name,
			locale: pageLang,
			types: selectedType?.map((item: any) => item?.value),
		}
		if (isEdit) {
			CategoryServices.update(data, selected?.id)
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					setSelectedType(null)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			CategoryServices.create(data)
				.then((response) => {
					setIsEdit(false)
					setSelected(null)
					setSelectedType(null)
					forceUpdate()
					successNotification("Enregistrement reussi avec succès")
					setLoading(false)
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
		createCategory,
	}
}

export default useCategory
