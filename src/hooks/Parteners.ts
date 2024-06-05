import { useAuthContext } from '@/common'
import PartenersServices from '@/services/PartenersServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
const Parteners = () => {
    const {
        errorNotification,
        successNotification,
        closeModal,
        forceUpdate,
        setIsEdit,
        setSelected,
        setImage,
        setImageUrl,
    } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()

    const createParteners = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('full_name', body?.full_name)
        formdata.append('email', body?.email)
        formdata.append('url', body?.url)
        if (body?.image) {
            formdata.append('image', body?.image)
        }

        if (
            location.pathname === `/partener/edit/${location.pathname.split('/')[3]}`
        ) {
            PartenersServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/partener/listparteners', { replace: true })
                    } else 
                    {
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
        if (location.pathname === '/partener/create') {
            PartenersServices.create(formdata)
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
                        navigation('/partener/listparteners', { replace: true })
                    } else {
                        errorNotification(
                            response.data
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
        createParteners,
    }
}

export default Parteners
