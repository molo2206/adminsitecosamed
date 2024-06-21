import { useAuthContext } from '@/common'
import CommunicatedServices from '@/services/CommunicatedServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
const useCommuniques = () => {
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

    const createCommuniques = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('title', body?.title)
        formdata.append('description', body?.description)
        formdata.append('author', body?.author)
        formdata.append('locale', pageLang)
        formdata.append('created', body?.created)
        if (body?.file) {
            formdata.append('file', body?.file)
        }

        if (location.pathname === `/communicated/edit/${location.pathname.split('/')[3]}`
        ) {
            CommunicatedServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/communicated/listcommunicate', { replace: true })
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
        if (location.pathname === '/communicated/create') {
            CommunicatedServices.create(formdata)
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
                        navigation('/communicated/listcommunicate', { replace: true })
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
        createCommuniques,
    }
}

export default useCommuniques
