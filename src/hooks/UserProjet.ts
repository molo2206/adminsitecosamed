import { useAuthContext } from '@/common'
import projectedServices from '@/services/ProjetServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ProjetServices from '@/services/ProjetServices'
const UserProjet = () => {

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

    const createProjet = (body: any) => {
        setLoading(true)

        const formdata = new FormData()
        formdata.append('title', body?.title)
        formdata.append('description', body?.description)
        formdata.append('locale', pageLang)
        formdata.append('datestarted', body?.datestarted)
        formdata.append('dateend', body?.dateend)

        if (body?.image) {
            formdata.append('image', body?.image)
        }


        if (location.pathname === `/projects/edit/${location.pathname.split('/')[3]}`
        ) {
            projectedServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/projects/list', { replace: true })
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
        if (location.pathname === '/project/create') {
            ProjetServices.create(formdata)
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
                        navigation('/projects/list', { replace: true })
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
        createProjet,
    }
}

export default UserProjet
