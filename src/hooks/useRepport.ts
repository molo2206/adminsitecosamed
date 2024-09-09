import { useAuthContext } from '@/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import RepportsServices from '@/services/RepportsServices'

const useRepport = () => {
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
        setFile,
    } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()

    const createRapports = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('title', body?.title)
        formdata.append('description', body?.description)
        formdata.append('author', body?.author)
        formdata.append('locale', pageLang)
        formdata.append('created', body?.created)
        if (body?.image) {
            formdata.append('image', body?.image)
        }
    
            formdata.append('file', body?.file)
        
        if (
            location.pathname === `/rapport/edit/${location.pathname.split('/')[3]}`
        ) {
            RepportsServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/rapport/list', { replace: true })
                    } else {
                        errorNotification(
                            'An error occured, please verify the f dimensions'
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
        if (location.pathname === '/rapport/create') {
            RepportsServices.create(formdata)
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
                        setFile(null)
                        closeModal()
                        navigation('/rapport/list', { replace: true })
                    } else {
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
        createRapports,
    }
}

export default useRepport
