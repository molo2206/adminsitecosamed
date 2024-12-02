import { useAuthContext } from '@/common'
import AddressServices from '@/services/AddressServices'
import { useState } from 'react'
const Adress = () => {
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

    const createAdress = (body: any) => {
        setLoading(true)
        if (isEdit) {
            AddressServices.update(body, selected?.id)
                .then((response: any) => {
                    forceUpdate()
                    successNotification(response.data.message)
                    setLoading(false)
                    setIsEdit(false)
                    setSelected(null)
                    closeModal()
                })
                .catch((err: any) => {
                    errorNotification(err ? err.response.data.message : err.message)
                    setLoading(false)
                })
        } else {
            // AddressServices.create(body)
            // 	.then((response:any) => {
            // 		setIsEdit(false)
            // 		setSelected(null)
            // 		forceUpdate()
            // 		successNotification(response.data.message)
            // 		setLoading(false)
            // 		closeModal()
            // 	})
            // 	.catch((err:any) => {
            // 		errorNotification(err ? err.response.data.message : err.message)
            // 		setLoading(false)
            // 	})
            console.log(body)
        }
    }

    return {
        loading,
        createAdress,
    }
}

export default Adress
