import { useAuthContext } from '@/common'
import OffresServices from '@/services/OffresServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const useOffres = () => {
    const {
        errorNotification,
        successNotification,
        closeModal,
        forceUpdate,
        setIsEdit,
        setSelected,
        pageLang,
        setImage,
        setImageUrl,
    } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()

    const createOffres = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('title', body?.title)
        formdata.append('description', body?.description)
        formdata.append('place', body?.place)
        formdata.append('locale', pageLang)
        formdata.append('startdate', body?.startdate)
        formdata.append('enddate', body?.enddate)
        if (body?.file) {
            formdata.append('file', body?.file)
        }

        if (
            location.pathname === `/offres/edit/${location.pathname.split('/')[3]}`
        ) {
            OffresServices.update(formdata, location.pathname.split('/')[3])
                .then((response: any) => {
                    setLoading(false)
                    if (response?.status === 200) {
                        forceUpdate()
                        successNotification(response.data.message)
                        setIsEdit(false)
                        setSelected(null)
                        setImage(null)
                        setImageUrl(null)
                        closeModal()
                        navigation('/offres/create', { replace: true })
                    } else {
                        errorNotification(
                            'An error occured, please verify the image dimensions'
                        )
                    }
                })
                .catch((err) => {
                    errorNotification(
                        err?.response
                            ? err.response.data.message
                            : err.message
                                ? err.message
                                : 'An error ocurred verifiy your image dimensions'
                    )
                    setLoading(false)
                })
        }
        if (location.pathname === '/offres/create') {
            OffresServices.create(formdata)
                .then((response: any) => {
                    setLoading(false)
                    if (response?.status === 200) {
                        forceUpdate()
                        successNotification(response.data.message)
                        setLoading(false)
                        setIsEdit(false)
                        setSelected(null)
                        setImage(null)
                        setImageUrl(null)
                        closeModal()
                        navigation('/offres/create', { replace: true })
                    } else {
                        console.log(response.message)
                        errorNotification(
                            response.message
                        )
                    }
                })
                .catch((err) => {
                    errorNotification(
                        err?.response
                            ? err.response.data.message
                            : err.message
                                ? err.message
                                : 'An error ocurred verifiy your image dimensions'
                    )
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    return {
        loading,
        createOffres,
    }
}
export default useOffres
