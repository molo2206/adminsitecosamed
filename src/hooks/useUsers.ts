import { useAuthContext } from '@/common'
import AuthServices from '@/services/AuthServices'
import useValidation from './useValidation'
import UserServices from '@/services/UserServices'
import { useState } from 'react'
const useUsers = () => {
	const {
		errorNotification,
		successNotification,
		closeModal,
		forceUpdate,
		isEdit,
		setIsEdit,
		setSelected,
		selected,
		selectedRole,
		setSelectedRole,
		saveUser,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)
	const { setInputs } = useValidation({})

	const createUser = (body: any) => {
		if (!selectedRole) {
			errorNotification('Please select a role for this user')
			return
		}
		setLoading(true)
		const data = {
			full_name: body?.name,
			email: body?.email,
			role_id: selectedRole[0]?.value,
		}
		if (isEdit) {
			UserServices.update(
				{
					password: body?.password,
					...data,
				},
				selected?.id
			)
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					setSelectedRole(null)
					setIsEdit(false)
					setSelected(null)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} else {
			UserServices.create(data)
				.then((response) => {
					setIsEdit(false)
					setSelectedRole(null)
					setSelected(null)
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
					closeModal()
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
			//console.log(data)
		}
	}

	const update_profile = (body: any) => {
		setLoading(true)
		AuthServices._updateProfile(body)
			.then((response) => {
				saveUser(response.data.data)
				setIsEdit(false)
				setSelectedRole(null)
				setSelected(null)
				successNotification(response.data.message)
				setLoading(false)
			})
			.catch((err) => {
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
			})
	}

	const update_password = (body: any) => {
		setLoading(true)
		AuthServices._updatePassword(body)
			.then((response) => {
				setInputs({
					old_password: '',
					new_password: '',
				})
				setIsEdit(false)
				setSelectedRole(null)
				setSelected(null)
				successNotification(response.data.message)
				setLoading(false)
			})
			.catch((err) => {
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
			})
	}

	const update_image = (body: any) => {
		setLoading(true)
		const formdata = new FormData()
		formdata.append('image', body)
		AuthServices._updateImage(formdata)
			.then((response) => {
				saveUser(response.data.data)
				setIsEdit(false)
				setSelectedRole(null)
				setSelected(null)
				successNotification(response.data.message)
				setLoading(false)
			})
			.catch((err) => {
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
			})
	}

	return {
		loading,
		createUser,
		update_profile,
		update_image,
		update_password,
	}
}

export default useUsers
