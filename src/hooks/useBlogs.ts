import { useAuthContext } from '@/common'
import EventServices from '@/services/BlogsServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
const useBlogs = () => {
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

    const createBlogs = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('title', body?.title)
        formdata.append('description', body?.description)
        formdata.append('author', body?.author)
        formdata.append('locale', pageLang)
        formdata.append('category_id', body?.category)
        formdata.append('documentation', body?.documentation)
        formdata.append('publication_date', body?.publication_date)
        if (body?.image) {
            formdata.append('image', body?.image)
        }

        if (
            location.pathname === `/blog/edit/${location.pathname.split('/')[3]}`
        ) {
            EventServices.update(formdata, location.pathname.split('/')[3])
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
                        navigation('/blog/listblog', { replace: true })
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
        if (location.pathname === '/blog/create') {
            EventServices.create(formdata)
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
                        navigation('/blog/listblog', { replace: true })
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
        createBlogs,
    }
}

export default useBlogs
