import { useAuthContext } from '@/common'
import RoleServices from '@/services/RoleServices'
import { useState } from 'react'
const useRole = () => {
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
	} = useAuthContext()
	const [loading, setLoading] = useState(false)

	const createRole = (body: any) => {
		setLoading(true)
		if (isEdit) {
			RoleServices.update(body, selected?.id)
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
			RoleServices.create(body)
				.then((response) => {
					setIsEdit(false)
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
		}
	}
	const addPermissions = (body: any) => {
		// body.map((item:any) => {
		// 	if(!item?.create && !item?.update && !item?.read && !item?.delete){
		// 		errorNotification('Please select one minus one permission')
		// 		return
		// 	}
		// })
		const data = {
			role_id: selectedRole?.id,
			permissions: body?.map((item: any) => ({
				ressource: item.id,
				create: item.create || 0,
				read: item.read || 0,
				update: item.update || 0,
				delete: item.delete || 0,
			})),
		}
		setLoading(true)
		RoleServices.setPermissions(data)
			.then((response) => {
				forceUpdate()
				successNotification(response.data.message)
				setSelectedRole(null)
				setLoading(false)
			})
			.catch((err) => {
				errorNotification(err ? err.response.data.message : err.message)
				setLoading(false)
			})
	}

	return {
		loading,
		createRole,
		addPermissions,
	}
}

export default useRole
