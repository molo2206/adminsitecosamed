import { useAuthContext } from '@/common'
import TypeMemberService from '@/services/TypeMemberService'
import { useState } from 'react'
const Typemember = () => {
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

    const createTypemember = (body: any) => {
        setLoading(true)
        const data = {
            name: body?.name,
            locale: pageLang,
            // types: selectedType?.map((item: any) => item?.value),
        }
        if (isEdit) {
            TypeMemberService.update(data, selected?.id)
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
            TypeMemberService.create(data)
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


    return {
        loading,
        createTypemember,
    }
}

export default Typemember
