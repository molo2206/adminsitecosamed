import { useAuthContext } from '@/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import MembersServices from '@/services/MembersServices'
const Members = () => {
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

    const createMember = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('name', body?.name)
        formdata.append('prename', body?.prename)
        formdata.append('sexe', body?.sexe)
        formdata.append('phone', body?.phone)
        formdata.append('email', body?.email)
        formdata.append('typemembre', body?.typemembre)
        formdata.append('thematique', body?.thematique)
        formdata.append('country', body?.country)
        formdata.append('ville', body?.ville)
        formdata.append('profession', body?.profession)
        formdata.append('corporation', body?.corporation)
        formdata.append('num_ordre', body?.num_ordre)
        if (body?.image) {
            formdata.append('image', body?.image)
        }
        if (
            location.pathname === `/members/edit/${location.pathname.split('/')[3]}`
        ) {
            MembersServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/members/list', { replace: true })
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
        if (location.pathname === '/members/create') {
            MembersServices.create(formdata)
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
                        navigation('/members/listmembers', { replace: true })
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
        createMember,
    }
}

export default Members
