import { useAuthContext } from '@/common'
import ThematiqueServices from '@/services/ThematiqueServices'
import { useState } from 'react'
const Thematiques = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
		pageLang,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const createThematiques = (body: any) => {
		// if(!selectedType){
		// 	errorNotification('Please select a type')
		// 	return;
		// }
		setLoading(true)
		const data = {
			value: body?.value,
			locale: pageLang,
			// types: selectedType?.map((item: any) => item?.value),
		}
		if (isEdit) {
			ThematiqueServices.update(data, selected?.id)
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			ThematiqueServices.create(data)
				.then((response) => {
					setIsEdit(false)
					setSelected(null)
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
		createThematiques,
	}
}

export default Thematiques
