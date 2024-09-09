import './modal.css'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import ReactLoading from 'react-loading'
import EventServices from '@/services/EventServices'
import ServiceServices from '@/services/ServiceServices'
import RoleServices from '@/services/RoleServices'
import CountryServices from '@/services/CountryServices'
import CategoryServices from '@/services/CategoryServices'
import PermissionServices from '@/services/PermissionServices'
import TeamServices from '@/services/TeamServices'
import { useState } from 'react'
import { useAuthContext } from '@/common'
import BlogServices from '@/services/BlogsServices'
import BulletinsService from '@/services/BulletinsService'
import OffresServices from '@/services/OffresServices'
import PartenersServices from '@/services/PartenersServices'
import ThematiqueServices from '@/services/ThematiqueServices'
import MembersServices from '@/services/MembersServices'
import CommunicatedServices from '@/services/CommunicatedServices'
import ProjetServices from '@/services/ProjetServices'
import RepportsServices from '@/services/RepportsServices'
interface Props {
	isOpen: any
	close: any
}
const DeleteModal = ({ isOpen, close }: Props) => {
	const location = useLocation()
	const {
		selected,
		toggleModalDelete,
		forceUpdate,
		errorNotification,
		successNotification,
	} = useAuthContext()
	const [isLoading, setIsLoading] = useState(false)

	const onDelete = async () => {
		setIsLoading(true)
		try {
			if (location.pathname === '/events/list') {
				const response: any = await EventServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/blog/listblog') {
				const response: any = await BlogServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/bulletins/list') {
				const response: any = await BulletinsService.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/thematique/listthematique') {
				const response: any = await ThematiqueServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}

			if (location.pathname === '/members/list') {
				const response: any = await MembersServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}

			if (location.pathname === '/communicated/listcommunicate') {
				const response: any = await CommunicatedServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}


			if (location.pathname === '/offres/create') {
				const response: any = await OffresServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			
			if (location.pathname === '/rapport/list') {
				const response: any = await RepportsServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}

			if (location.pathname === '/projects/list') {
				const response: any = await ProjetServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}

			if (location.pathname === '/team') {
				const response: any = await TeamServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/testimonials/list') {
				const response: any = await TeamServices.deleteTesti(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/books/list') {
				const response: any = await TeamServices.deleteBooks(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/category') {
				const response: any = await CategoryServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/services/list') {
				const response: any = await ServiceServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/partener/listparteners') {
				const response: any = await PartenersServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/countries') {
				const response: any = await CountryServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/cities') {
				const response: any = await CountryServices.deleteCity(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/roles') {
				const response: any = await RoleServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
			if (location.pathname === '/ressources') {
				const response: any = await PermissionServices.delete(selected?.id)
				forceUpdate()
				successNotification(response?.data?.message)
				toggleModalDelete()
                setIsLoading(false)
			}
		} catch (err: any) {
			errorNotification(err ? err.response?.data.message : err?.message)
			setIsLoading(false)
		}
	}
	return (
		<div className="text-center">
			<Modal isOpen={isOpen}>
				<ModalHeader className="text-center">
					<div className="icon-box">
						<i
							className={`ri ri-delete-bin-5-fill text-danger`}
							style={{
								fontSize: 40,
							}}></i>
					</div>
					<h2>Are you sure?</h2>
				</ModalHeader>
				<ModalBody className="pl-4 pr-4">
					Do you really want to delete these records? This process cannot be
					undone.
				</ModalBody>
				<ModalFooter style={{ width: '50%' }}>
					<Button
						disabled={isLoading}
						style={{
							width: '40%',
						}}
						onClick={close}
						color="secondary">
						Cancel
					</Button>{' '}
					<Button
						disabled={isLoading}
						style={{
							width: '40%',
						}}
						onClick={onDelete}
						color="danger">
						{isLoading ? (
							<span>
								<ReactLoading
									type={'spokes'}
									color={'#fff'}
									height={20}
									width={20}
								/>
							</span>
						) : (
							<span>Delete</span>
						)}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default DeleteModal
