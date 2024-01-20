import { useAuthContext } from '@/common'
import PermissionServices from '@/services/PermissionServices'
import { useState } from 'react'
const usePermission = () => {
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

	const createPermission = (body: any) => {
		setLoading(true)
		if (isEdit) {
			PermissionServices.update(body, selected?.id)
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
			PermissionServices.create(body)
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


	return {
		loading,
		createPermission,
	}
}

export default usePermission
