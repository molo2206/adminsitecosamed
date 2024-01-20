import { useAuthContext } from '@/common'
import CountryServices from '@/services/CountryServices'
import useValidation from './useValidation'
import { useState } from 'react'
const useCountry = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)
	const {setInputs} = useValidation({})

	const createCountry = (body: any) => {
		setLoading(true)
		if (isEdit) {
			CountryServices.update(body, selected?.id)
				.then((response:any) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					closeModal()
				})
				.catch((err:any) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			CountryServices.create(body)
				.then((response:any) => {
					setIsEdit(false)
					setSelected(null)
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					closeModal()
				})
				.catch((err:any) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
	}
	const createCity = (body: any) => {
		setLoading(true)
		if (isEdit) {
			CountryServices.updateCity(body, selected?.id)
				.then((response:any) => {
					setInputs({})
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setIsEdit(false)
					setSelected(null)
					closeModal()
				})
				.catch((err:any) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			CountryServices.createCity(body)
				.then((response:any) => {
					setInputs({
						country_id:"",
						name:""
					})
					setIsEdit(false)
					setSelected(null)
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					closeModal()
				})
				.catch((err:any) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
	}
	return {
		loading,
		createCountry,
		createCity
	}
}

export default useCountry
