import { useAuthContext } from '@/common'
import SettingServices from '@/services/SettingServices'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
const useSettings = () => {
	const {
		errorNotification,
		logo1,
		logo2,
		setLogo1,
		setLogo2,
		successNotification,
		forceUpdate,
		image1,
		image2,
		image3,
		image4,
		image5,
		setImage1,
		setImage2,
		setImage3,
		setImage4,
		setImage5,
	} = useAuthContext()
	const [loading, setLoading] = useState(false)
	const location = useLocation()

	const createSettings = (body: any) => {
		setLoading(true)
		if (location.pathname === '/settings/about-us') {
			SettingServices.saveAbout(body)
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		} 
		if (location.pathname === '/settings/logo') {
			const data = new FormData()
			data.append('logo1', logo1)
			data.append('logo2', logo2)

			SettingServices.saveLogos(data)
				.then((response) => {
					forceUpdate()
					setLogo1(null)
					setLogo2(null)
					successNotification(response.data.message)
					setLoading(false)
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
		if (location.pathname === '/settings/images') {
			const formdata = new FormData()
			if (image1) {
				formdata.append('image1', image1)
			}
			if (image2) {
				formdata.append('image2', image2)
			}

			if (image3) {
				formdata.append('image3', image3)
			}
			if (image4) {
				formdata.append('image4', image4)
			}
			if (image5) {
				formdata.append('image5', image5)
			}

			SettingServices.saveImages(formdata)
				.then((response) => {
					forceUpdate()
					setImage1(null)
					setImage2(null)
					setImage3(null)
					setImage4(null)
					setImage5(null)
					successNotification(response.data.message)
					setLoading(false)
				})
				.catch((err) => {
					errorNotification(err.message)
					setLoading(false)
				})
		} 
		if (location.pathname === '/settings/general') {
			SettingServices.saveSettings(body)
				.then((response) => {
					forceUpdate()
					successNotification(response.data.message)
					setLoading(false)
				})
				.catch((err) => {
					errorNotification(err ? err.response.data.message : err.message)
					setLoading(false)
				})
		}
	}

	return {
		loading,
		createSettings,
	}
}

export default useSettings
