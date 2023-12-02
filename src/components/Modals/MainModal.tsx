import { Modal } from 'react-bootstrap'
interface props {
	show?: boolean
	close?: (() => void)|undefined
	title: string
	children: any
	size:any
}
const MainModal = ({ show, close, children, title,size }: props) => {
	return (
		<Modal size={size} centered show={show} onHide={close}>
			<Modal.Header
				onHide={close}
				closeButton>
				<Modal.Title as="h4">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	)
}

export default MainModal
