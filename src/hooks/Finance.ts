import { useAuthContext } from '@/common'
import FinanceServices from '@/services/FinanceServices'
import { useState } from 'react'
const Finance = () => {
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

    const SaveFinance = (body: any) => {
        const formdata = new FormData()
        formdata.append('year', body?.year)
        formdata.append('bailleur', body?.bailleur)
        formdata.append('financement', body?.financement)
        formdata.append('projet', body?.projet)

        setLoading(true)
        if (isEdit) {
            FinanceServices.update(formdata, selected?.id)
                .then((response: any) => {
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
            FinanceServices.create(formdata)
                .then((response: any) => {
                    setIsEdit(false)
                    setSelected(null)
                    forceUpdate()
                    successNotification(response.data.message)
                    setLoading(false)
                    closeModal()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return {
        loading,
        SaveFinance
    }
}

export default Finance
