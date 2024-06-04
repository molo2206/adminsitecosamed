import React from 'react'
import { Form } from 'react-bootstrap'
import EventServices from '@/services/EventServices'
import TeamServices from '@/services/TeamServices'
import CountryServices from '@/services/CountryServices'
import ServiceServices from '@/services/ServiceServices'
import RoleServices from '@/services/RoleServices'
import PermissionServices from '@/services/PermissionServices'
import UserServices from '@/services/UserServices'
import CategoryServices from '@/services/CategoryServices'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '@/common'
import BlogServices from '@/services/BlogsServices'
import BulletinsService from '@/services/BulletinsService'
import OffresServices from '@/services/OffresServices'
interface StatusPprops {
	status: any
	id: string
}
const ChangeStatus = ({ status, id }: StatusPprops) => {
	const [checked, setChecked] = React.useState(status === 1 ? true : false)
	const location = useLocation()
	const { errorNotification, successNotification, forceUpdate } =
		useAuthContext()
	const handleChangeStatus = async (id: any) => {
		try {
			let newStatus
			if (status === 1) {
				newStatus = 0
				setChecked(false)
			} else {
				newStatus = 1
				setChecked(true)
			}
			if (location.pathname === '/events/list') {
				const response = await EventServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/blog/listblog') {
				const response = await BlogServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}

			if (location.pathname === '/bulletins/list') {
				const response = await BulletinsService.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}

			if (location.pathname === '/offres/create') {
				const response = await OffresServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			
			if (location.pathname === '/team') {
				const response = await TeamServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/testimonials/list') {
				const response = await TeamServices.statusTesti(
					{ status: newStatus },
					id
				)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/books/list') {
				const response = await TeamServices.statusBooks(
					{ status: newStatus },
					id
				)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/category') {
				const response = await CategoryServices.status(
					{ status: newStatus },
					id
				)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/services/list') {
				const response = await ServiceServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/users') {
				const response = await UserServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/countries') {
				const response = await CountryServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/cities') {
				const response = await CountryServices.statusCity(
					{ status: newStatus },
					id
				)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/roles') {
				const response = await RoleServices.status({ status: newStatus }, id)
				successNotification(response?.data?.message)
				forceUpdate()
			}
			if (location.pathname === '/ressources') {
				const response = await PermissionServices.status(
					{ status: newStatus },
					id
				)
				successNotification(response?.data?.message)
				forceUpdate()
			}
		} catch (err: any) {
			errorNotification(err ? err.response.data.message : err.message)
		}
	}
	return (
		<div>
			<Form.Check // prettier-ignore
				type="switch"
				id="custom-switch"
				checked={checked}
				onChange={() => handleChangeStatus(id)}
			/>
		</div>
	)
}

export default ChangeStatus
